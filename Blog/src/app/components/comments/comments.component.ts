import { Component, OnInit, Input } from '@angular/core';
//import { CommentsService } from '../../services/comments.service';

interface Comment {
  id?: number;
  postId: number;
  userId: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input() postId!: number;
  comments: Comment[] = [];
  newComment: string = '';

  constructor() { }

  
}
