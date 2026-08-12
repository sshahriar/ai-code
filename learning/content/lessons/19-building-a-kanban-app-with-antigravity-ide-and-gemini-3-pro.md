# Building a Kanban App with Antigravity IDE and Gemini 3 Pro

> Week 1 · Day 3

## Overview

Okay, it's time for us to move on from Codex and move to anti-gravity, the last, the fourth of our list of four. And, you know, I can't resist but having this up a little bit more, I think that obviously Codex did a fantastic job, the bar is high for anti-gravity.

It's worth pointing out that the reason Codex did so well is because we are using the absolute frontier, frontier model now. Whilst we had it set to pick its own model before, but I'm pretty sure that with cursor, we were using Composer, which is Curser's internal lower cost model that they have built, optimized for cursor.

This is good, but not a codecs level, not at GPT 5.2 codecs level. And then after that, I believe when we were using GitHub co-pilot, I was using Cloud Hiku 4.5, which is good, but again, it's a smaller model.

## You will learn

- Understand the main ideas covered in **Building a Kanban App with Antigravity IDE and Gemini 3 Pro**
- Follow the practical walkthrough from Week 1, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

codecs 5.2 and on high reasoning, really strong model. Strong model means strong results that you can see for sure. Okay, enough on to anti-gravity.

All right, well I am back. I'm back at Cursor again. I'm back in the instant project in Cursor because this is where we go to reset things, we might as well, it's just like a useful terminal to have open.

I'm still in the projects directory. If you do a PWD, make sure that you are in projects or do CD dot dot if you're inside instant. And then what I'm going to do of course, as before, is I'm going to rename by doing move mv the camban folder, the whole folder to be codecs_camban.

And once I've done this, that is, that has been renamed. There's no more camban. And I can now do a git clone to bring camban back down again.

There it is. We've got ourselves a new fresh camban. It's time for us to try out anti-gravity.

Okay, here we are at anti-gravity's website, it's at anti-gravity.google, you got a cool URL, and so it says 'experience liftoff with the next generation IDE' and there is a download for Mac OS and I'm guessing you've got a download for and whatever your platform is, but there's also a download button up here where you can actually pick the one that you want. And you should then download it. And if you're on a Mac, you'll have something where as usual, you drag the icon into applications.

If you're on a PC, you've got a little wizard. When you launch it, there'll be a few questions. You should just pick the default stick with what it wants, pick whatever color scheme you like for everything else.

Just stick with the defaults, go through it and it should open up. And I'm guessing that you're going to see something that's going to look surprisingly familiar. Let's see.

Okay. So first up, first up, it looks kind of similar to cursor again and to VS code. And that's because it is VS code again, like cursor, it is just a clone of VS code, a fork.

They've remade VS Code for anti-gravity. That's why it's similar. It's because it's the same thing.

And you may see exactly the screen I've got here. And if not, guess what you do. You go to File and New Window.

And then you will see this. Ah, surprising, huh? Now you should have already signed into Google with a Google auth, with a Google account.

It's part of downloading this. But if not over here on the top right, this is where you set up your Google auth login and would log in to Google in the usual way. And so that's how we've got to where we are.

And you can see that we're facing a screen which has the usual stuff with an open folder and an agent conversation. This time it's on the right. And it's time for us to open a folder.

Okay, I'm pressing open folder. I'm going to go into projects. I'm going to go into canban and I'm going to open it.

### Deep dive

And here we have a very familiar looking screen with a middle area, files on the left and over here on the right is our agent chat. And it's telling us about Gemini three flash frontier level intelligence blazing fast speed. Okay, and a generous and more generous quotas.

Okay, and so just to take you through what we see here, first up you can see, hang on, let me just dismiss this, you can see that there is an, I just missed that, you can see there's the ability to choose between a planning mode or not, we'll leave it on planning mode. We've got a selection of models and interestingly you can see that Google offers the anthropic models as well as using the open source version of GPT/OSS but we are going to leave it here and yeah we can now give this a well. Alright and if I could draw your attention here to the settings, anti-gravity settings on the bottom here click there, up comes a few things that we can mess around with.

First of all, Agent AutoFix lints. So, a lint error is when the code doesn't pass some basic checks about the way that it's been structured. And you can set that on which we will do, which means that it will fix any of those kinds of errors that surface.

Good practice to do that. And now here is like being able to control YOLO mode. If in doubt, leave this on request review so that it needs to check with you before, but I'm going to put this on to always proceed and always proceed.

There's a rather nice agent decides option here where it can decide whether or not it wants to ask you for permission, but I'm going to be YOLOing all the way today, you should only do that if you're comfortable with it. All right, so those are some settings for us. And now we've got this on planning mode.

We're almost ready to go. There's one more thing we need to do. Having a single file called agents.md has been something of a sort of evolving standard that people have just kind of adopted.

Although as you'll see, a Claude code uses Claude.md but otherwise very similar. But anti-gravity has not adopted the standard. They've gone a different direction.

So we are not going to use agents.md but instead we're going to click here, select all and copy all of that. So just edit menus like all, edit menu copy or command A, command C on a Mac, controller control C on a PC. All right.

And now, instead of that, we're going to put this somewhere else. Okay, we're going to create a new folder in the project route, in in Canban. Right-click anywhere here, select new folder, and we're going to call it.agent, like so.

And then with in.agent, and.agent, it's like a special folder that anti-gravity expects. And you can have different folders within this that tell it about different things and in particular there's an important folder called rules that tells it it's rules and then within this folder you can make markdown files and we are only going to have one and we will call it a new file we can call it anything we want but we'll call it like a strategy dot md And when we do that, it comes up with this special look. It's expecting this to be in a certain way.

First of all, there is an activation mode, which is telling anti-gravity in what circumstances does it need to read all of this into context. All right. And so we are going to say always on.

It could also be manual. It could be modeled decision if we wanted the model to be able to choose. And I'm now going to paste in the content, which is the whole of our agents dot md and save that.

And it's done. Always remember to save, by the way, a command s on a Mac, control s on a PC, make sure that the dot disappears. So that is a saved file.

Okay, we've saved that. I'm now I'm actually going to delete this agents to Mmd to avoid any confusion here. We've only got our single rule, our strategy.md in the rules directory within the dot agent directory in the Canban project route.

And with that, we're actually ready to go. And so over here on the right, I'm going to say to Gemini that, uh, please go ahead, go ahead and see what it does. And it's off.

### Putting it together

And we're using Gemini 3 Pro. I've left it on. Okay, Gemini 3 Pro High.

So this is on a big tier of Gemini. We're going with the strongest version. And we will see how it fares with this.

I will see you back here in a moment. Okay, well, it's completed. It's finished.

It's given me this summary here, the camban MVP walkthrough with this nice little thing, with apparently a screenshot of it. Moving, how about that? Is that for real?

Is this what it's actually going to look like? That would be cool. It's got like a recording of it, isn't that crazy?

And then here is instructions on how to run it. Okay, and then we'll see here it wants me to accept all the changes that it made and It seems to be ready for me to try it. I do believe it is actually already running.

So Okay, let's bring up a browser and let's see. Let's see how it does. Okay So this is what I see in a browser first of all I should point out something you may have seen that while this was running It was actually bringing up browsers and testing it itself, checking the screens look good.

That's how I did that screen recording. And so I know it was actually real screen recording. And it also brought up this thing called Playwrights, which is where it drives a browser with browser automation software to run a series of tests.

And you can also, you can see that it's in some of these tests, it was failing and it fixed them and then it would then source success. For some reason it didn't actually seem to fix that last one but but anyways it was working away, beavering away, doing all of this and it's time for us to see what it actually looks like. And here it is, this is the result, here is the result from Gemini through anti-gravity, let's see what we make of it.

And first up I'd say I think it looks pretty good, it looks fresh and clean. I'm thinking, I think it looks very good. We can flip things around.

Yes, that all seems to work. Let's move that over there. Let's see if we can add a card, enter, okay.

That's a bit janky having like a local host thing there, but we'll say, okay. And then there it is. And now can we come in?

Oh, we can't actually add a description to that. That seems a bit mediocre. And can we change this title?

Yes, we can. This is good. There we go.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

codecs 5.2 and on high reasoning, really strong model. Strong model means strong results that you can see for sure. Okay, enough on to anti-gravity.

## Practical tips

- I'm still in the projects directory. If you do a PWD, make sure that you are in projects or do CD dot dot if you're inside instant. And then what I'm going to do of course, as before, is I'm going to rename by doing move mv the camban folder, the whole folder to be codecs_camban.
- Good practice to do that. And now here is like being able to control YOLO mode. If in doubt, leave this on request review so that it needs to check with you before, but I'm going to put this on to always proceed and always proceed.
- And then with in.agent, and.agent, it's like a special folder that anti-gravity expects. And you can have different folders within this that tell it about different things and in particular there's an important folder called rules that tells it it's rules and then within this folder you can make markdown files and we are only going to have one and we will call it a new file we can call it anything we want but we'll call it like a strategy dot md And when we do that, it comes up with this special look. It's expecting this to be in a certain way.
- First of all, there is an activation mode, which is telling anti-gravity in what circumstances does it need to read all of this into context. All right. And so we are going to say always on.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

That's done. Okay, that's great. So I'd say that this adding a new card is the only thing that feels a little bit simplistic. Let's see if we can't improve that.
