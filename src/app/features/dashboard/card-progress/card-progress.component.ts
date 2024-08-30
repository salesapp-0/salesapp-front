import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-progress',
  standalone: true,
  imports: [],
  templateUrl: './card-progress.component.html',
  styleUrl: './card-progress.component.scss'
})
export class CardProgressComponent {
  @Input() title!: string
  @Input() amount!: number
  @Input() percent!: number
}
