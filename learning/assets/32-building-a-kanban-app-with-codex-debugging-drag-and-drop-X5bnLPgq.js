var e=`# Building a Kanban App with Codex Debugging Drag and Drop

> Week 1 · Day 5

## Overview

All right, so yes, approved, proceed with part five and off it goes. And again, I'll see you in a sec.

Okay, it says now that part five is waiting for the sign off. Part five, you may remember, it's all really about documenting the database because you do want to check this out first.

So I'm going to open this, let me close this, have a look at this. So the users is a database table that makes sense, board one board per user, title stored for future multi-board expansion, that makes sense, columns, cards, okay, ordering, strategy, migration, approach.

## You will learn

- Understand the main ideas covered in **Building a Kanban App with Codex Debugging Drag and Drop**
- Follow the practical walkthrough from Week 1, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So it's interesting, it's, I had thought it would store everything as a JSON blob, so it could be easily provided. But this is possibly a better design. Maybe I might not perhaps the most sensible way of doing it.

This seems like a pretty good approach, I have to say. So we're going to go with it. We are going to say that we're going to approve, approved, proceed.

Two parts. Six, I probably would have done it differently but then my way might have been a little bit more hacky. This is perhaps a better way of doing it.

We will see, I'll let it do part six and I'll see you in a sec. Okay, well I confirmed part six finished and then I checked it, nothing is broken, it hasn't yet wired up, the front and the back end. Everything still seems to be fine.

Again, I'm going to do a git status. I'm going to do a git add git commit minus m part six done. Okay, so we've taken our git checkpoint and now we come over here and say proceed with part seven.

I'll also press keep here. So we keep all those changes, proceed with part seven, I'll also press keep here, so we keep all those changes, proceed with part seven, and off it goes, and we will, yeah, a moment ago, I thought that it was already hooked up the front and the back end, I forgot that's what part seven is all about. Part seven is hooking up the front and the back end, that's what it's now doing, it's a big deal, so this is probably the most significant change we've had so far, I will see you when it's ready.

Okay, it's been in thralling, but it's been 15 minutes on the go here and we are now at the point where I do believe we have a part seven ready for us to test and it's been a lot of change. A lot has happened, a lot of changes, tests were repeatedly failing and it rebuilt them. It had to do a lot of rewriting of the front end for this to work.

So anyway, let's do the usual ScriptStart Mac. Let it come up, see if it does come up successfully. It's building a production build, which is what I like to see.

This is these are the steps that it would need to do. Okay, and it believes that it's running. Let's go and take a look.

Here it is, localhost 8000. Okay, so far so good. It's serving something here, user and password.

We'll get those usual warnings. Here it comes, okay, okay. And not now, alright.

So here we have it. Let's move this over here. Well, that's not a good sign, is it?

That's interesting. That one did move. There's something janky with the way that they move.

### Deep dive

But anyway, let's start by seeing if this has worked. So we've moved this over here, let's bring up a separate browser, let's we'll actually close that down altogether, come in again, log in as user password and see what's happened there and it has indeed come up fine, it's moved it to the second column, it did get persisted. That's pretty impressive.

This is working nicely. We just have to fix this problem with the drag and drop. So I'll dig into that a bit and then we'll give it a message.

Okay, so I'm going to stop the server. I'm going to do a git status. I'm just going to make sure we capture where we are, git add dot git commit, This M part seven built some drag and drop bugs.

Okay, and now I'm going to see if I can't prompt it to fix these UI bugs. The persistence is working, but the drag and drop seems to only work occasionally. Most of the time I drag a card the next column highlights, but when I release the card goes back to its original position.

Please test thoroughly and fix. Fix. I'll reproduce the problem.

Fix it and confirm it is fixed. That is the way to do it. Always make sure that you're very prescriptive about debugging and we'll see how it gets on with this.

I will see you in a sec. Okay, so this has been an interesting debugging experience just trying to get the drag and drop to work. It's been going at it for half an hour.

It's been continually in this loop, it seems, really stuck in a rut of trying again and again. And I can see it keeps saying it's likely because of this. I keep seeing it like jumping to conclusions, which is such a such a classic move by the LLM.

And then somewhat to my surprise, I stopped it. You can stop it by pressing like the stop button that's here. And I just decided to go in and try it myself.

And I found that it has in fact fixed it along the way. At some point in the last half an hour, it did actually fix it. It's working great, but the tests that it was running to try and test drag and drop were failing.

And so it just continually decided that it hadn't fixed it. So kind of bizarre, but it shows that that human involvement was needed to be able to check and confirm that actually it's working fine. So now with that in mind, let me show you it working right now.

So I'm going to bring up my server with startmac.shell. Up it comes. Everything is starting up.

Go to a browser, go to localhost 8000, here we go. We're going to go in as user password. We're going to get that angry message saying it's not a good password.

### Putting it together

Yes, yes, we know that. Here we are. We're at a campman studio.

I can now indeed drag and drop and it works. And there it is. And now we will do some more dragging.

I'll drag that one over there. Now this is empty. See all of that.

I'm going to open a new tab. I'm going to close this tab down. I'm going to go back to localo state thousand.

I'm going to log in again as user and password and sign in and back we are. And you can see that that has worked. We've got an empty column here.

Everything is looking great. Congratulations to our agent to codex. Things are going well.

Okay, so back I go here, I'm going to stop that server, I'm also going to do a git status, and I'm going to do a git add dot and git commit -m sub part seven working. And there we've done it, we're in good shape, we now have part seven is in good shape, it's time for us to move on. Let's just quickly take a look at the plan to remind ourselves of where we are here, part seven is done, and we're going on to part eight, which is AI connectivity.

And now I have something important to discuss with you. Over the course of this time that we've spent together going through parts one to seven, our context window has been gradually filling up. We don't actually get that display that we get in when we're using cursor.

It's handling it for us, but we know that we're filling things up and we've certainly reached a point now where it's gonna be summarizing and dropping some of the messages and so on. This is something that we are going to obsess over when we use Cloud Code next week and everyone that is a pro on Claude Code obsesses over this and we don't have as much visibility to it but we should obsess over it just as much nonetheless and a technique that is a common good practice but it feels kind of galling to do it is that at some point we should stop the chat and start again and have it read plan.md to understand where we've got. So that's what we're going to do now.

I'm going to start by saying, please confirm that plan.md is up to date with all the latest, including any design decisions that you made. Let me know when ready. So we're going to update plan dot MD and make sure that that we're super happy with it.

And then we're going to do a big step of resetting the chat. Okay, that is done.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So it's interesting, it's, I had thought it would store everything as a JSON blob, so it could be easily provided. But this is possibly a better design. Maybe I might not perhaps the most sensible way of doing it.

## Practical tips

- Okay, so I'm going to stop the server. I'm going to do a git status. I'm just going to make sure we capture where we are, git add dot git commit, This M part seven built some drag and drop bugs.
- Fix it and confirm it is fixed. That is the way to do it. Always make sure that you're very prescriptive about debugging and we'll see how it gets on with this.
- And now I have something important to discuss with you. Over the course of this time that we've spent together going through parts one to seven, our context window has been gradually filling up. We don't actually get that display that we get in when we're using cursor.
- It's handling it for us, but we know that we're filling things up and we've certainly reached a point now where it's gonna be summarizing and dropping some of the messages and so on. This is something that we are going to obsess over when we use Cloud Code next week and everyone that is a pro on Claude Code obsesses over this and we don't have as much visibility to it but we should obsess over it just as much nonetheless and a technique that is a common good practice but it feels kind of galling to do it is that at some point we should stop the chat and start again and have it read plan.md to understand where we've got. So that's what we're going to do now.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So I'm going to press keep here to keep the changes. I'm just going to do one more get status and just just to see it has indeed updated plan.md I'm just going to do a git.get commit as m final tweaks, final updates after part seven and that is done and here we go. And what I'm now going to do is over here, I am going to right click here and I'm going to say new chat, starting all over again, built with agent. Here we go, it's time for us to go on to part eight.
`;export{e as default};