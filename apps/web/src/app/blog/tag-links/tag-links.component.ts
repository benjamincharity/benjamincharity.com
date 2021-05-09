import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'bc-tag-links',
  templateUrl: './tag-links.component.html',
  styleUrls: ['./tag-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagLinksComponent implements OnInit {
  @Input() tags: ReadonlyArray<string> = [];
  @Input() routeBase = '';

  constructor() {}

  ngOnInit(): void {}
}
