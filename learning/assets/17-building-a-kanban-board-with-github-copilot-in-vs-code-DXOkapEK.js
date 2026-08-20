var e=`# Building a Kanban Board with GitHub Copilot in VS Code

> Week 1 · Day 3

## Overview

Okay, I have gone back to the instant project in cursor. So you can go to file, new window, find your way to instant.

I'm back over here in instant and I've closed down camban. That's gone.

I've exited from the camban project. For me, I press the red button.

## You will learn

- Understand the main ideas covered in **Building a Kanban Board with GitHub Copilot in VS Code**
- Follow the practical walkthrough from Week 1, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

You can press the x on Windows. And here I am in instant. I'm currently in the instant directory.

If I PWD, you can see that I'm in userz projects instant. I'm going to go up one cd dot dot, cd space dot dot, and now in just my projects directory, users add projects. And now I'm going to do something a bit sad.

I'm going to change, I'm going to rename our camban directory. The way you rename is you type mv, which is short for move. I'm going to change canban, you do the name the the previous name canban, and I'm going to call that instead cursor underscore canban, which means that that whole directory has been renamed to something else canban no longer exists.

If I try and do CD canban, I'll get an error. Look, no such file directory, camban. Okay, it's gone.

And now, and now of course, I'm going to, to within the projects directory, I'm gonna do a git clone and paste in the same old URL again. And I've just brought in a new camban directory with that single file, agents.md. So now we have a cursor camban, which has that whole thing we just built.

And now we have a fresh cambam directory which is just got the one file in it. It's time now for us to look at GitHub co-pilot. So we are now going to use GitHub co-pilot which is a fiendishly popular AI agent for coding and I'm looking here at GitHub's main landing page and GitHub co-pilot is right up there on the platform.

And you can see if you go to plans and pricing that there is a free tier, which gets you a certain number of requests a month before you have to start paying. And so for sure you can do this without paying a cent. And so there are various different ways that you can use co-pilot.

You can use it in a command line interface, which we're not doing this week. You can use it through through a sort of web front end as well. But the most popular way and the way that we will be doing it is using VS code, the open source code editor IDE that is so very popular.

And it's going to look very familiar because as it happens, cursor is itself a fork of this same editor, the same ID, it's also a VS Code clone. And so it's gonna look very, very similar. And that's what we're gonna do.

And that means that the first thing we need to do is install VS Code. So you may already have VS Code, but if not, there's the right here conveniently. There is a link, get it now.

Over here, this is where you can download it. This of course is defaulting to Mac OS because it knows I'm on that. There's also a download button where you can download it for your platform of choice, whatever you are on.

And you would then download VS Code. If you already have VS Code, you could do the check for updates to make sure you got the latest version of it. And once you've installed it and opened it and probably answered a few questions, but they should be very standard stuff.

I will see you over in VS Code. Okay, and when you finally got VS Code running, you may see a welcome screen like this. You may see a different screen, it doesn't really matter, but it looks a bit different to cursor, but there's some familiarity over here.

And the first thing we're going to do is install an extension. And you do that by going to the View menu and selecting extensions. It's also command shift X on a Mac or control shift X on a PC.

I'll press that now. Up comes the extensions marketplace here. And you're going to type out GitHub co-pilots in there.

You shouldn't need to type it all out. Up will come something and there should be a blue install button. I don't have a blue install button.

Why is that? Because of course I've already installed it. If I click on it to make sure I've got the right one, you can check that it's from the verified github.com and I have 69 million downloads and you probably have more and and here we have it.

This is what it looks like. You should press the blue install button in either place and that will then put github co-pilot into your vs code. Okay, next up you go to file new window.

Up comes this screen. It looks a little bit different. You go to open.dot.dot, go and find your projects folder, find Kanban again.

There it is, go into Kanban, press open, and now I'm going to make this a bit bigger with Kanban Plus. And I'm going to resize this to fit the whole screen. So we are looking here at our can ban.

You can see the word can ban is in block capitals here. It's at the title here. We know we're looking at the can ban project in VS code.

So far, so good. OK, next up, it's important to sign in to GitHub if you're not already. And the way that you do that is down here on the bottom left, click on the avatar and you can see that I'm signed into my GitHub account.

### Deep dive

And there should be like a sign in right here. And if there's not, then please check out the course resources. If you have any problems with this, as people figure this out, I will add in instructions to make sure that everyone is clear on how you connect to your GitHub account to use GitHub co-pilot.

co-pilot. And when you are ready and you've done that, you need to press on a Mac, it's command shift I, and on a PC it's control shift I, I'm going to press that now, and bam, a build with agent appears over there on the right. And you can also bring this up by going to the view menu and selecting chat, that's the same as control shift I or command shift I.

Okay, and so it's brought up this sidebar that looks very familiar because it's quite similar to Kasser. And down here, you can see this is where we can put an instruction to the agent. There's a drop down here where we can choose to put the agent in plan mode.

Sounds familiar. There is also this here where we can choose what model we are connecting to. I have it on auto where we'll pick one for us.

But you can see that there are also a bunch of models that are provided for free in the lowest tier plan, depending on the details of what plan you have. You may have access to different models. And on that topic, if you hover down here, you'll see it pops up something about how much you have been using co-pilot, which shows you a sort of bar of what's been going on and shows you what kinds of how your usage is against your allowance and you can see more details of that on the GitHub Copilot website with the different plans, the free and paid plans and how much you get.

Okay, so with that, that's just the quick tour of these interface. It's time that we put our agent to work. Okay, here we go.

So I'm putting the agent onto plan mode and I'm going to say, I don't know, please plan the task at hand. It's got the agents.md and I'm expecting it will pick that up and it has picked that up and it's off and it's off. It's gathered the context with a Kanban project plan.

So I will let it do some planning, hopefully yours is as well and I will see you in a second. All right, the plan completed. As before, there's some stuff here.

It seems like it might be interesting but I'm not going to read it. I'm going to go ahead and press the start implementation button. You can see here that we could continue it in the background but we're just going to have it run right here.

I think we'll talk more about the cloud services another time. And off it goes. so I select that and then start implementation appears in the chat and then press enter and off it goes.

So I will let it do its thing and I will see you back here shortly once it's made some progress. But it is now going to be prompting me to see if I want to allow and you can see that we can say always allow, We can just say for now, I'm going to allow this one. So I'm just going to press allow right here.

I'm going to let it go on and do the next thing. And almost immediately it's asking me if I can have permission to send no followed by enter to the terminal. So we'll let it do what it wants to do.

And I'm going to keep approving what it wishes while it does its thing. Now what I might do is I might, yeah, I'm just going to allow it as it goes. And then at the right time I will give it more permissions.

All right, let's have a look at this. It wants to run a command. Now what we can say is we can say always allow.

And I'm going to say allow all commands in this session. So this is like a YOLO mode that we're going on to. Let it do its thing.

I'm going to be watching carefully. You should choose the level of risk you're comfortable with. You can have it be approving step by step as you want so that you can watch what happens.

But I will let it do its thing and I will see you back in a second. Okay, well, in the spirit of not only showing you when things go well, this time it seems to be struggling a bit, in a way. It just tried to bring up it.

It did a lot of coding. I needed to approve another thing that it still needed me to approve. Um, and then it had a few bugs that it fixed.

Uh, and then, and then it tried to start the server. And first of all, it started in the wrong directory and got a bunch of errors. And then it figured that out and it changed to the right directory, started the server again.

And then it, it ran a command to bring the server up and it's just been sitting there, waiting, not realizing that the server has, and it's just been sitting there waiting, not realizing that the server has come up. It's kind of jammed, and I guess it wants me to interrupt it by canceling right here and stop it from thinking. But there is something of a surprise here, which I will reveal after stopping it.

Okay, so here we go. I will indeed stop it. Done, it has stopped.

And now to show you the surprise. So here's the surprise. I'm going, I'm here in the terminal, I'm in the front end directory, and I can do mpm run dev, which is the command to start the server.

### Putting it together

And if I do that, it brings up a server, and if I now go to that web address, you can see that it's actually done a really good job, It's finished. Even though it's sort of, it floundered at the very last minute. It seemed to get stuck.

But what we have here of course is a camban. It's got quite a nice layout and the way that you can move things around. I actually rather prefer this to the one that we got from Kursa.

I believe that we've been using through the GitHub Copilot. We've been using a Claude Haikou, a very small model, but I think it's done a fabulous job. You can see we can move things around, the drag and drop seems to work great, and I think this is a pretty good implementation.

Unlike the one that we got from Kerse, we don't have any errors showing here. Let's try deleting to see if it will delete. Oh no, look at that, delete is not working.

That's one bug. Can we rename this to, okay, yes we can rename the columns. All right, so, you know, it's most of the way there.

Not bad at all, not bad for its first pass, even with the hanging at the end. And we'll give it a chance to try and fix that problem that it's made, let's come back over here, just here where it says, files change, we press keep to make sure that we keep anything that has been affected. And let's stop the server.

And let me just say in here, everything seems to be working well. To be working well, except the delete card feature isn't working. Let's give it that feedback.

Let's see how it does with this and we will give it a chance and I will come back in just a second. Okay, well it believes that it's fixed it. The delete card features should now work.

Now this shows me it's an interesting sign particularly with some of the smaller models. What I dislike about this is that it has done a classic move by coding agents which is to guess what it thinks the problem is, put in a fix and then claim victory. And that's just riddled with problems.

First of all, it shouldn't guess. It should prove the problem. If it thinks it has a theory, we would always want it to prove it.

And secondly, it shouldn't just fix something and say it's fixed without testing and demonstrating. It needs to reproduce an issue, prove the root cause, fix it, demonstrate it's fixed, and it should always do that. And when you're watching this, particularly if you're somewhat new to development, then you need to be the boss of that process.

You need to push back and challenge, even if it has it right. And I don't know if it has it right. We will give it a try now and see if it actually got it right.

Okay, so I do MPM run dev to bring up the server. There it is. Here is my screen and there we go.

Let's try deleting. Just as I thought. No change at all.

If it hasn't proven the problem, then it probably doesn't work. So that didn't work. Let me just check if I keep here that that doesn't change anything.

But I don't think so that that that won't change anything at all. at all. And in fact, we now do see an issue appearing here.

Okay, all right. So I will keep hammering away at it. We'll tell it.

I'll give it strictly the feedback that that didn't fix it. And I'm going to tell it. So I said that didn've reproduced it.

Find the root cause. Fix it. And prove you fixed it.

That's how to give it instructions to do this in a disciplined way and you have to take it through that process. Okay, and I will allow it to do its thing and as it looks in the webpage and I will see you again in a second. Okay, it now claims that has reproduced the problem, fixed it and implemented a fix and tested it.

We will be the judge of that. Here we go, it's running, the server is running, I bring this up, I come in here, I press delete and indeed it has fixed it, excellent.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

You can press the x on Windows. And here I am in instant. I'm currently in the instant directory.

## Practical tips

- And you would then download VS Code. If you already have VS Code, you could do the check for updates to make sure you got the latest version of it. And once you've installed it and opened it and probably answered a few questions, but they should be very standard stuff.
- You shouldn't need to type it all out. Up will come something and there should be a blue install button. I don't have a blue install button.
- Why is that? Because of course I've already installed it. If I click on it to make sure I've got the right one, you can check that it's from the verified github.com and I have 69 million downloads and you probably have more and and here we have it.
- So far, so good. OK, next up, it's important to sign in to GitHub if you're not already. And the way that you do that is down here on the bottom left, click on the avatar and you can see that I'm signed into my GitHub account.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And I think that this was fortuitous, very, very convenient, because I think it's a really important learning point about, first of all, not believing it when it tells you it's found the problem and fixed it, and secondly giving it those specific instructions. Reproduce the problem, prove the root cause, fix it, demonstrate that you've fixed it. That's the right recipe for success with debugging. Okay, onwards.
`;export{e as default};