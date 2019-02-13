import { Component, OnInit } from '@angular/core';
import { PostContent } from '../postContent';
import { PostService } from '../post.service';


@Component({
  selector: 'app-wall-content',
  templateUrl: './wall-content.component.html',
  styleUrls: ['./wall-content.component.css']
})
export class WallContentComponent implements OnInit {

  posts: PostContent[];
  isEditPost: Boolean = false;
  editPost: PostContent;
  isGiveLike: Boolean = false;
  giveLike: PostContent;
  filterPost: string;

  constructor(public pubService: PostService) { }
  ngOnInit() {
  this.pubService.getPublications().subscribe(content => {
  console.log(content);
  this.posts = content;
  });
  }

  editPostNow(event, post: PostContent) {
  this.isEditPost = true;
  this.editPost = post;
  }

  updatePost(post: PostContent) {
  this.pubService.editPost(post);
  this.clear();
  }

  deletePost(event, post: PostContent) {
  this.pubService.deletePost(post);
  this.clear();
  }

  giveLikeNow(event, post: PostContent) {
  this.isGiveLike = true;
  this.giveLike = post;
  }

  updateLikes(event, post: PostContent) {
  this.pubService.giveLike(post);
  this.clear();
  }

  clear() {
  this.isEditPost = false;
  this.editPost = null;
  }

  uploadImg() {
  }
}
