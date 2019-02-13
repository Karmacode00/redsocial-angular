import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostContent } from './postContent';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({

  providedIn: 'root'

})

export class PostService {
  postCollection: AngularFirestoreCollection<PostContent>;
  posts: Observable<PostContent[]>;
  postDoc: AngularFirestoreDocument<PostContent>;
  counter: number;
  constructor(public afs: AngularFirestore) {

    this.postCollection = afs.collection<PostContent>('posts');
    this.posts = this.postCollection.snapshotChanges().pipe(

      map(post => post.map(texto => {
        const datos = texto.payload.doc.data() as PostContent;
        const id = texto.payload.doc.id;
        return { id, ...datos };
      }
      ))
    );

  }

  getPublications() {
    return this.posts;
  }

  addPost(content: PostContent) {
    this.postCollection.add(content);
  }

  deletePost(content: PostContent) {
    this.postDoc = this.afs.doc(`posts/${content.id}`);

    this.postDoc.delete();
  }

  editPost(content: PostContent) {
    this.postDoc = this.afs.doc(`posts/${content.id}`);
    this.postDoc.update(content);
  }

  giveLike(content: PostContent) {
    this.postDoc = this.afs.doc(`posts/${content.id}`);
    content.likeCounter = content.likeCounter + 1;
    this.postDoc.update(content);

  }

}
