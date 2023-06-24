import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from '../shared/theming.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  themes: string[];
  themingSubscription: Subscription;

  @HostBinding('class') public cssClass: string;

  constructor(
    private theming: ThemingService,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit() {
    this.themingSubscription = this.theming.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
    this.themes = this.theming.themes;
  }

  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses =
      this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.theming.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  changeTheme(theme: string) {
    this.theming.theme.next(theme);
  }
}
