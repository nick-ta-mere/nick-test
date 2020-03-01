import { Component, OnInit, Input } from "@angular/core";
import { MessageService } from '../message.service';

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessageComponent implements OnInit {
  @Input() public message: string;
  @Input() public id: number;
  @Input() public rolls;

  constructor(public messageService: MessageService) { }

  ngOnInit() {}

  public remove(){
    this.messageService.remove(this.id);
  }
}
