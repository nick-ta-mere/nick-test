import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessageComponent implements OnInit {
  @Input() public message: string;
  @Input() public rolls;

  constructor() {}

  ngOnInit() {}
}
