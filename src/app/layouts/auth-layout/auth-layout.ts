import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [Navbar,  RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
