import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public current: string;
  public routes: Record<string, string> = {};
  
  @Input() showLegend: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    for (let route of this.router.config.filter(x => x.path != "**")) {
      this.routes[route.path] = route.data.name;
    }
    this.current = this.router.url.replace("/", "");
  }
}
