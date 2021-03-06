import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';
import { Log } from 'ng2-logger';

import { SHOPPINGCARTITEMTYPE } from '../../enums/shopping-cart-item-type';
import { Alert } from '../../interfaces/alert';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';
import { AlertService } from '../../services/alert/alert.service';

/**
 * Shopping cart page component
 * @author Daniel Sogl, Tim Kriessler
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  /** Logger */
  private log = Log.create('ShoppingCartComponent');
  /** Shopping cart items */
  public cartItems: ShoppingCartItem[] = [];
  /** Sum */
  public sum: number;
  /** checkType variable */
  public checkType: any = SHOPPINGCARTITEMTYPE;

  /**
   * Constructor
   */
  constructor(private service: AlertService) {}

  /**
   * Initalize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Load items from local storage
    localforage
      .getItem<ShoppingCartItem[]>('cart-items')
      .then(items => {
        if (items) {
          this.log.d('Cart items', items);
          this.cartItems = items;
          this.cartItems.sort((a, b) => {
            if (a.eventname < b.eventname) {
              return -1;
            }
            if (a.eventname > b.eventname) {
              return 1;
            }
            return 0;
          });
        }
        this.calculateSum();
      })
      .catch(err => {
        this.log.er('Error getting local storage items');
      });
  }

  /**
   * Calculate sum of all ShoppingCartItems total prices
   */
  calculateSum() {
    this.sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.calculateTotalPrice(this.cartItems[i]);
      this.sum += this.cartItems[i].price * this.cartItems[i].amount;
    }
  }

  /**
   * Decrease shopping cart item amount
   * @param  {ShoppingCartItem} cartItem Item
   */
  decreaseQuantity(cartItem: ShoppingCartItem) {
    if (cartItem.amount > 1) {
      cartItem.amount--;
    }
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount decremented. Event: ' + cartItem.name + ' ' + cartItem.eventname
    );
    localforage.setItem('cart-items', this.cartItems);
  }

  /**
   * Increase shopping cart item amount
   * @param  {ShoppingCartItem} cartItem Item
   */
  increaseQuantity(cartItem: ShoppingCartItem) {
    cartItem.amount++;
    this.calculateTotalPrice(cartItem); // update total price
    this.calculateSum(); // update shopping cart sum
    this.log.info(
      'Amount incremented. Event: ' + cartItem.name + ' ' + cartItem.eventname
    );
    localforage.setItem('cart-items', this.cartItems);
  }

  /**
   * calculate the total price of a shoppingcart position
   * @param  {ShoppingCartItem} cartItem Item
   */
  calculateTotalPrice(cartItem: ShoppingCartItem) {
    cartItem.totalPrice = cartItem.amount * cartItem.price;
  }

  /**
   * Delete shopping cart item
   * @param  {ShoppingCartItem} cartItem Item
   */
  deleteCartItem(index: number) {
    const alert: Alert = {
      title: 'Produkt aus Warenkorb entfernt'
    };
    this.cartItems.splice(index, 1);
    localforage.setItem('cart-items', this.cartItems);
    this.calculateSum();
    this.service.showSuccess(alert);
  }
}
