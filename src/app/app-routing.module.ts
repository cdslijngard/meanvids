import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideoCenterComponent } from "app/video-center/video-center.component";
import { HomeComponent } from "app/home/home.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'videos', component: VideoCenterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }