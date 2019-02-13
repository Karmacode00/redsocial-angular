import { Component, OnInit } from '@angular/core';
import { PostContent } from '../postContent';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  content: PostContent = {
    title: '',
    text: '',
    date: '',
    name: '',
    photoUrl: '',
    likeCounter: 0,
    imgPost: '',
  };

  postCollection: AngularFirestoreCollection<any>;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(private pubServicio: PostService, public afAuth: AngularFireAuth, private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  profileUrl: Observable<string | null>;
  downloadURL: Observable<string>;
  task: Observable<string>;
  selectedFile = null;
  filePath: string;
  fileroot: string;
  urlColection: string;
  isUploadImg: Boolean = false;
  iconImg: Boolean = true;
  isclose: Boolean = false;

  ngOnInit() {
  }

  upImg() {
    this.iconImg = false;
    this.isclose = false;
  }

  close() {
    this.iconImg = true;
  }

  newPost(myForm: NgForm) {
    this.iconImg = true;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const time = new Date().getTime();
        const date = new Date(time).toLocaleString();
        const name = user.displayName;
        const photo = user.photoURL;
        this.content.date = date;
        this.content.name = name;
        this.content.photoUrl = photo;

        this.pubServicio.addPost(this.content);
      }
    });
  }


  addImg(event) {
    this.selectedFile = event.target.files[0];
    const fileroot = this.selectedFile.name;
    const ref = this.storage.ref(fileroot);
    const task = this.storage.upload(fileroot, this.selectedFile);

    task.snapshotChanges().pipe(
        finalize(() => {
     this.profileUrl = ref.getDownloadURL();
     this.profileUrl.subscribe(url => {
       const myImage = new Image();
       myImage.src = url;
       this.content.imgPost = myImage.src;
          });
        })
    ).subscribe();

  }
  }

