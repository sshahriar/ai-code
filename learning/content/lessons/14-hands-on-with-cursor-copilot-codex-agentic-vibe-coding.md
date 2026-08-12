# Hands-On with Cursor, Copilot, Codex & Agentic Vibe Coding

> Week 1 · Day 3

## Overview

I'm not going to lie, I feel a little bit guilty that yesterday was all me talking. Well, I have good news.

Today, let's talking more doing. Welcome to your first yellow day, the first day of working with products.

Welcome to the day when we go through Cursor, Copilot, Codex and Antigravity. Let's get started.

## You will learn

- Understand the main ideas covered in **Hands-On with Cursor, Copilot, Codex & Agentic Vibe Coding**
- Follow the practical walkthrough from Week 1, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So the purpose for today is for me to show you a number of the different agentic coding products out there and also to get it as an opportunity to show you some of the way that you go about doing what we call vibe coding. And I want to give you some principles to keep in mind throughout today. First of them is that everything I show you today is going to be optional for you.

I want you to have a feel for the different agentic AI coding platforms there are out there. It doesn't mean that you need to use all of them. You might want to, and I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I be clawed code that we're really going to dig into next week and that can be the one that you stick with, you don't need to do them all.

And then the second point to mention is that you are going to get different results to me. I say your results may vary. Your results will vary.

And I'm going to be using some versions of models and you might be on different models, you might be on cheaper models, if you don't want to spend so much, you might be on free models, you might be on something completely different. So your results might be different, go with what you have and yeah, take it, take it as part of the experience to see different results. And the single most important principle for today is not to get frustrated.

If things don't go well and the agent starts delivering nonsense, which can happen, particularly if you're getting downgraded to cheap hurt models, then the trick is first of all, be patient. It's easy for me to say it. I lose my patience myself sometimes.

Try and stay patient. Give the agent feedback on what's happening. And then if in doubt, simplify, simplify, simplify.

Reduce the scope of the problem, make it simpler, get something to work and then build from there. Simplification is such a big trick to keep in mind. And if you can't get it to work, you can always just delete and start everything again and just give it a second shot from from the beginning.

And if that doesn't work, you can always skip that particular product and go to the next product and see if that works. There's so many options today. Most important of all is to have fun with it.

We're going to be playing with tons of different products. We're going to be seeing very different results. It's really interesting.

You should enjoy today a lot. And with that, let's go straight to the lab. I would like you to open back up Cursor again.

Cursor that we already had some experience with. Go back into Cursor and I will see that. And this is what Cursor should look like when you open it.

### Deep dive

And if not, you go to File and you go to New Window and then you should see this. and I would like you to start by going back to the instant project that we already worked on. It might pop it up as one of the things here or you might need to press open project and go into it but once you have you should be back in instant.

Let's look familiar. This is what we did before. This is where we're going to begin.

Now what I now like you to do is to find the course resources. If you don't already have them to hand they are linked in many of the first few videos in Udemy. You wish they should have got a link in your welcome email when you're enrolled.

Bring up the course resources and find this section. So you're following along there, and the first thing you should see is a link to the website for Node.js, Node. And if you don't already have Node installed in a system, that's what we're going to do right now.

And this, this is nodes landing page right here. It is node JS dot org. And when you come here, I want you to click on download, which if you haven't done it before, is where we will download node.

So here on the download page, you will see that you can get nodes to install it on a Mac or on a PC. It's defaulted to the Mac settings right here. This using these commands is the way to do it on a Mac.

Don't worry about where we run them. We'll do that in just a second together. And if you're on a PC, then you can.

If you're on Windows and you have something called Chocolaty, if you've used that before, you could just install it this way. But also, you could come down here, go to Windows, pick X64 and then use this to get a normal Windows installer. Use any of these techniques to install Node.

If you have any problems with it, then you should just message me or look at the course resources in case I've got some suggestions there. And when it comes to running commands, if you want to run these commands for Windows or Mac rather than running this installer, the place that you can do that is back here in cursor. When you're looking at cursor, you can go to the view menu and select terminal and up will come this little screen here, a little terminal and this is where you can punch in the commands to install node.

And once you've done it, once you've installed node, you can then bring up a new terminal by pressing like the plus button here, you get a new terminal and in here you should be able to type node minus minus version and you should get back a version. Maybe it's the same as me, maybe you've got a back a version. Maybe it's the same as me.

Maybe you've got a more recent version. Anything after 22 is great. And at this point you are set with Node.js.

### Putting it together

Any problems with it? Drop me a message, a Q and A and you to me or an email and I'll help out or look in the course resources for tips. Now we're just going to spend a few moments now in this terminal and some of you use terminals all the time.

For some of you, this might be a bit new and there's nothing to be afraid of even if it does look a little bit like it's something hung over from the 80s. But here we are. What we're looking at here is we're looking within the directory that's called instant that we created before that's in perhaps in a projects directory.

And the way you can see that is you can type this command pwd, which stands for print working directory. And it tells you where you are. And I am in users ed projects instant, which makes sense.

And if you're on a PC, it will look a bit different. You'll have backslashes and sort of forward slashes, but it's going to be much the same kind of thing. You're in instant.

And that's a fine place to be if you're working on instant, but we're going to work on something different. So what I want to do is I want to go up one directory to the projects directory and the way you do that is you type cd for change directory and then a space and then dot dot and I know most of you know this already but then when I do that if I now do pwd you can see that sure enough I am in the parent directory I'm in the projects directory where I have all of my projects, quite a few of them. Okay, and if you look in the course resources, you'll see that I have a repository, a repo on GitHub that I now want to bring down locally so that that repo is on your computer.

And there's a simple way to do it. It's a git clone command. I'm going to type git clone, and then I'm going to paste in the link to that repo.

There it is right here. It'll also be on the course resources, it's hcpps github.com/ed-donor/camban.get. You know what a camban is?

That's what we're about to be doing. So I run this and bam, it happens, I've done it. We now have a directory, I can go into it.

You don't need to but I can go cd c can, ban and there we go, we are in canban. If I do PWD then you will see I am in users ed projects can ban and you will be in some different thing probably with backslashes maybe but basically the same idea you will have canban set up that is the project we'll be working on now. Okay so now to switch over from instant to this new project called Canban, you go to the cursor's file menu and you say new window and this screen comes up.

Remember this screen. And now you press open projects. Okay, fair enough.

Here we go. And now you go into your project, so you navigate your way to your project's directory and you'll see that there is Canban.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So the purpose for today is for me to show you a number of the different agentic coding products out there and also to get it as an opportunity to show you some of the way that you go about doing what we call vibe coding. And I want to give you some principles to keep in mind throughout today. First of them is that everything I show you today is going to be optional for you.

## Practical tips

- I want you to have a feel for the different agentic AI coding platforms there are out there. It doesn't mean that you need to use all of them. You might want to, and I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I I be clawed code that we're really going to dig into next week and that can be the one that you stick with, you don't need to do them all.
- And I'm going to be using some versions of models and you might be on different models, you might be on cheaper models, if you don't want to spend so much, you might be on free models, you might be on something completely different. So your results might be different, go with what you have and yeah, take it, take it as part of the experience to see different results. And the single most important principle for today is not to get frustrated.
- If things don't go well and the agent starts delivering nonsense, which can happen, particularly if you're getting downgraded to cheap hurt models, then the trick is first of all, be patient. It's easy for me to say it. I lose my patience myself sometimes.
- Reduce the scope of the problem, make it simpler, get something to work and then build from there. Simplification is such a big trick to keep in mind. And if you can't get it to work, you can always just delete and start everything again and just give it a second shot from from the beginning.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Here it is. And then you go into Canban by double clicking and then you press the open button to have launched the Canban project and you'll know because it'll say Canban here and it will say Canban in block capitals up on the top left and that means we've had success. We are now in the Canban project. Great, it's time for us to start work.
