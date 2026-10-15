# Firestore Rules Update Required

Add this rule to your Firestore Rules in the Firebase Console
(Firestore → Rules) to enable the campaign levels:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --- existing user/username/h2h rules (keep these) ---
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /usernames/{name} {
      allow read;
      allow write: if request.auth != null;
    }
    match /h2h/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // --- NEW: campaign levels ---
    match /levels/{levelId} {
      // anyone can read levels (signed in or not)
      allow read: if true;
      // only the admin account can create/update/delete levels
      allow write: if request.auth != null
                   && request.auth.token.email == 'iihothefa@gmail.com';
    }
  }
}
```

Paste this into Firebase Console → Firestore → Rules → Publish.
