import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Input() selId: Number;
  chart;

  constructor() {}

  ngOnInit() {
    let values = [];
    this.chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: `Real time data visualization`
      },
      data: [
        {
          type: 'spline',
          dataPoints: values
        }
      ]
    });
    this.chart.render();

    const sockets = socketIo('http://localhost:5000');

    sockets.on('hello', data => {
      console.log(data);
    });

    sockets.on('variableValues', data => {
      console.log(values);

      if (data.id === this.selId) {
        values.push({
          x: values.length + 1,
          y: data.data.value
        });
      }
      this.chart.render();
    });
  }
}
