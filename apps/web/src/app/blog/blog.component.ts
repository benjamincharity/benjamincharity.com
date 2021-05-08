import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bc-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articles$ = this.scully.available$.pipe(
    map((scullyRoutes: ScullyRoute[]) => {
      return scullyRoutes.filter(
        (r) => r.route.startsWith('/blog/') && r.sourceFile?.endsWith('.md')
      );
    })
  );

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {}
}
