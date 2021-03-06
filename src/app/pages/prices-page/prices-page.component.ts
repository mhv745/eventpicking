import { Component, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';

/**
 * Price page component
 * @author Daniel Sogl, Markus Kirschner
 */
@Component({
  selector: 'app-prices-page',
  templateUrl: './prices-page.component.html',
  styleUrls: ['./prices-page.component.scss']
})
export class PricesPageComponent implements OnInit {
  /** Logger */
  private log = Log.create('PricesPageComponent');

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
