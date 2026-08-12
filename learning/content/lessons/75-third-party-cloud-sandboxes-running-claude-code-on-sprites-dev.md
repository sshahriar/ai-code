# Third-Party Cloud Sandboxes Running Claude Code on Sprites.dev

> Week 3 · Day 2

## Overview

Well, look, I'm honestly shocked, but it only took seven minutes or something, uh, at six minutes, less than this, and- and, uh, less time than it took to write that document. And it went through all of those to-dos, and it then gave me this beautiful output, explaining what it's done with the testing, with- with all of the things.

There's all of the tasks that it completed, and it says- it's made 90-plus comprehensive tests, which sounds amazing. So, with all of that, it's then made a PR that we can then go in or just made it made it made this branch that we can then make a PR and then merge in the changes and see what we think.

Let's do that. So I go in, I press create PR, up it comes, we can come down and have a look at all the things that is built here.

## You will learn

- Understand the main ideas covered in **Third-Party Cloud Sandboxes Running Claude Code on Sprites.dev**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It's changed 21 files with 1600 lines of code in here. You can see some of this stuff, this looks, well I don't have time to go through this carefully but I'm pleased to see that there's plenty of what appears to be not unwieldy, there's some initial setup, not unwieldy functions here. Okay, well we'll just go with that.

We're going to say create pull request. We're going to do a merge. It should be fine.

Merge pull request, confirm merge, and that is done. How about that? And now of course you could just go in and make a ton more issues.

Make an issue to go and carry out the tests to do a code review. You could be just just throwing in lots and lots of issues to get your project done. But we have other things to try.

So just in case you're getting disorientated by how much we're covering today, I just want to remind you of the three techniques we're going to be doing. And we've done the blue and the purple and we're about to do the yellow. The blue, we used native sandboxing/sandbox so that we can control the environment we're running in and auto-approve a ton of stuff.

That was the blue. And then we did the purple and the purple within the purple. There are five different ways to run Claude code in a sandbox out on the web.

A couple of them didn't work for me because I'm florobics having production problems, but the mobile one was really cool. And the GitHub one was absolutely fantastic. I hope you like that.

That is such a way to work. Imagine combining that with the techniques we learned last week, how you could just be firing off GitHub issues and just letting it run in the cloud. Okay, and now finally, the yellow, the third approach, which is to use a third party cloud sandbox.

And I suggest this is optional for you, because this is something which you may be very satisfied with what we've already covered, very happy with AnthropiX Cloud if you want to use any cloud and not need to use a third party cloud sandbox. It's more, particularly if you're not using Cloud, say, this is something which is useful to know that these things exist. They are a new up and coming thing.

And in particular, I'm going to pick one which has got a lot of press recently made by Fly.io, but there are a bunch of them, and you could pick whichever one you like, I'll give you this example. We're going to set up an account. The product is called Sprite.dev, and it's this idea of having a really simple, nice sandbox in the cloud.

We'll set one up, we'll use it, and then we will move on. We won't dwell on it too much. Let's go do that.

So this is what you get if you go to Sprite.dev in your favorite browser. You get an ISO website, stateful sandbox environments with checkpoint and restore. So they give you this sort of isolated world where you can operate in, but they add in some extra features to make it super useful, like being able to go back in time.

It's a hardware isolated execution environment for arbitrary code, a persistent Linux computer, whether it's an AI agent like Cloud Code, or a binary your user just uploaded sprites are the simplest answer for where should I run a blob of code. And look at that right now they're offering $30 of trial credits, maybe you have something similar. It says create like 500 sprites with read.

That sounds good. So I'm going to sign up now and go through a quick sign up flow. It's completely up to you.

### Deep dive

You may have had your fill of remote execution, but should you wish to then go through it with me and I'll see you back in a sec. And after signing up, it is telling me it needs my credit cards, which I know for some of you is like, "Uh-uh." So even despite the free credits, it's going to want me to put in a card, which I will do now. But as I say, you can choose to just watch me go through it and consider it for the future if you'd prefer.

Now after I put in my credit card, it then slightly confusingly bounced me to fly.io's landing page because Sprites.dev is built by fly.io and I had to just know to get back to Sprites.dev and then I was then logged in. And the first screen it shows you has the instruction that you use to install the Sprite command line interface, the Sprite command. And that instruction contains within it your key.

And so I can't show it to you because it has my key and you'll be able to mimic me, which would be no good, but you have to take that exactly as it says, paste it into any terminal and this one will do just fine, the one we've already got for finally, which I have right here in VS Code, put it in there and it will work and then Sprite will be there. And once you've done that, you type sprite login and it will then pop up a browser window and you sign in with the same credentials you just used to make sure that you're then fully signed in. And I of course have already done that.

So now I am signed in and I can use the command sprite and you will not believe how easy it now is. Here we go. Hold on to her.

You're not going to believe this. I'm going to type Sprite, and then the command is Sprite create. And that means I want to build an instance, an engine up on the cloud that I can just use myself.

And you give it a name. So we'll call it like, I don't know, like, um, remote worker remote. We'll call it remote fight.

We'll call it finally worker. So it's clearly something that we're building for us. Finally, worker.

It's going to be our worker. Created, finally, worker in 0.6 seconds. Fly.io take great pains to tell you how proud they are of how fast it is to spin up your own box, which in the past has been something that has been problematic, kind of getting access and installing everything on a server in the cloud.

And for them, it is bam, it's ready for you. So it is there. And we've created it and we can now use it.

And this prompt, Sprite, that Sprite, is telling us that we are here connected to something that is remote. We're connected to this box out on the cloud. Okay, so if I run the command LS to see what is in this directory that we are sitting in on the cloud, there's nothing there at all.

Well, let's change that. Let's do git clone and then paste in our repo, our finally repo. And bam, now doing LS.

This finally is there on this box in the cloud. CD finally. Let's look at it.

It's everything is there a backend, cloud.md, a license, the planning directory and a read me. Okay. Well, that's something we've got up there.

We've got our repo here. What what should we do next? Well, I've got an idea of what we should do next.

### Putting it together

We should run Claude. We should just type Claude and guess what? It comes pre-installed on all of the boxes.

So when you run Claude, up comes Claude Code. And it says choose the style that works and the usual questions that you may remember from the first time you ever launch Cloud Code. We'll say that we want dark mode and then it's going to want us to log in and this is confusing because it's going to want to do this Cloud account login.

But this is all running out there on the Cloud. So it's going to try and like you know login, bring up a browser window on some remote box in the cloud. But no, they've thought of all of this.

They've got it all worked out so that when I press one here, it's launches the browser locally on my computer. I press authorize, and then I go back here again, and I've logged in to cloud on this remote box. Press enter to continue.

Press enter to continue. Warning, Cloudco running in bypass permissions mode. Yes, I accept.

They have automatically configured clords to be in dangerously skipped permissions in Yolo mode. And that's okay because it's running on this isolated hardware out there on the cloud. It doesn't matter what it does.

Nothing can can happen. It's just running with a public repo out on the cloud. And bypass permissions is on.

And this is a classic example of what it's like to run on a server in the cloud in a total sandbox on a third party sandbox. And as a particular pro point, you might have noticed that it's running an older version of Cloud Code, and it's using Opus 4.5, and I want to be on Opus 4.6. And that's only because it's like a fresh install on this box.

If I get out of Claude code and then I launch Claude code again, it automatically updates itself and we are now on the latest version and on Opus 4.6. And here we are running a version of Claude code. It feels like it's just running on my box, right?

It looks like, but especially as I'm using the terminal inside VS code in the finally repo, it feels just like it's running here, but it's not. This is running out there on the cloud in a third party sandbox. And so let's give it a command.

Here we go. Please read all the documentation in the planning folder. The market data backend has been implemented with tests, carry out a comprehensive code review, run all the tests, write your conclusions, do market data review in the planning folder.

And we can set this off. It's running out there on the cloud, not on my computer in this, this, this third way, this different way of doing it, using a third party sandbox instance. And this is really cool.

And this is, this is very much, this is the latest, this is like the pioneering way to do it. And it's particularly, it's so easy to spawn new instances and run things like this.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It's changed 21 files with 1600 lines of code in here. You can see some of this stuff, this looks, well I don't have time to go through this carefully but I'm pleased to see that there's plenty of what appears to be not unwieldy, there's some initial setup, not unwieldy functions here. Okay, well we'll just go with that.

## Practical tips

- It's changed 21 files with 1600 lines of code in here. You can see some of this stuff, this looks, well I don't have time to go through this carefully but I'm pleased to see that there's plenty of what appears to be not unwieldy, there's some initial setup, not unwieldy functions here. Okay, well we'll just go with that.
- And so I can't show it to you because it has my key and you'll be able to mimic me, which would be no good, but you have to take that exactly as it says, paste it into any terminal and this one will do just fine, the one we've already got for finally, which I have right here in VS Code, put it in there and it will work and then Sprite will be there. And once you've done that, you type sprite login and it will then pop up a browser window and you sign in with the same credentials you just used to make sure that you're then fully signed in. And I of course have already done that.
- And you give it a name. So we'll call it like, I don't know, like, um, remote worker remote. We'll call it remote fight.
- So when you run Claude, up comes Claude Code. And it says choose the style that works and the usual questions that you may remember from the first time you ever launch Cloud Code. We'll say that we want dark mode and then it's going to want us to log in and this is confusing because it's going to want to do this Cloud account login.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And yeah, it's completely isolated. So this is great, this is up and running, and it's running on the fly.io hardware, on this sprites.bev hardware, not on anthropics hardware, and certainly not on my computer. We will let it do its thing and I will report back. Hopefully, when we have a market data review.md.
