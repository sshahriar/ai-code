# Getting Started with Claude Code CLI Init, Context & Testing

> Week 2 · Day 1

## Overview

Okay, I'm now going to do a file new window and I'm going to open up a project open. I'm going to go into projects and I'm going to choose PM the project that we did last week.

Here it is. Let me make this a bit bigger and make this cover all this screen.

And I think this is pretty much where I left it. I'm going to close the chat, the GitHub co-pilot chat.

## You will learn

- Understand the main ideas covered in **Getting Started with Claude Code CLI Init, Context & Testing**
- Follow the practical walkthrough from Week 2, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We're done with you. You are dead to us. I see I've got some lint errors here, some red squiggly's underlined.

I don't remember that, I'm not sure whether I just did something wrong when I tried to accept the changes. But anyway, that's a good problem for us to have right now. As you will see, let's open up a new terminal.

This is Control Backtick again, and it is time now within PM for us to launch Claude Code. But actually first, let me just do a git status to see what this looks like. I haven't yet checked in all the latest changes.

So let's do that git add.git commit - m step 10 complete. Okay, so here we are. We're now ready to see what Cloud can make of all of this.

So the first thing I'm gonna ask you to do is actually exit the terminal by typing exit and then open a new terminal just to make sure it's absolutely new. You can also do this by pressing the plus button over here to have a completely new terminal and then type the word "clord" C-L-A-U-D-E. And up comes the interface for "clord code CLI".

And it is very much what they call a CLI interface which means you're seeing things printed as like characters and lines in this in this very old school way like we're in a previous decade of working with computers. And it is a bit of a throwback experience, which is intentional. If this feels old school, that's that's the vibe of of this whole platform.

If I can use that word, it's it's meant to be feeling like you've got this very raw native interaction with the LLM and so you just kind of go with it is intentionally retro Okay, and so the first thing to do when if you want to talk to Claude You could just type if you want to give it a command Then you do a slash and then the command you want to do and the first command you want to do is the command log in if you haven't used Cloud Code before, which is your way of signing in to your anthropic account that we just set up a moment ago. When you do that, it's going to bring up a web interface for you to then log in using your credentials and then it will come back and you will be logged in to anthropic. So you should try that first.

And if you want to be using free models, then just hang on in there until we get to that later. Okay, the next command to know about is a command that later. Okay, the next command to know about is a command that sets Claude up, which is only needed if you're coming new into a project like this.

Claude does not use the agents.md file that we've got very comfortable with. It just has its own variation that's called Claude.md. Now what we could do is just rename agents.md to Claude.md, but another thing to do perhaps is to type slash command and then init.

And that means, Claude, I want you to set yourself up for this whole platform, please. Please get yourself organized. So we'll give that a try now.

We're going to run / init. Now what you'll see is that Claude puts here-- first of all, it puts a sort of humorous kind of processing thing. Like in this case, it's newspapering.

It puts different silly things here. And you'll see that it starts doing stuff, and you'll see this sort of flashing white dot, and you'll see that it's doing searching, it's analyzing, it's exploring, and it's going to use this as its way of understanding what an earth is going on in this directory structure. We will let it do its thing, and I'll come right back.

Okay, well, it's done its thing. It's read lots of things. It's read the existing agent.md file as well.

You can see there. It's done its thing. It's read lots of things.

### Deep dive

It's read the existing agents.md file as well. You can see there, it's telling me, and it now has read ready to write a clawed.md file. It's created one itself.

What you'll see is that at the top here, we can see the diffs that it's got. It's showing that in VS code. As I say, so even though we're not using the extension, the sidebar, it's still able to drive that in the S code.

And now this famous thing that Claude Code has that it says, would you like to make this edit? And you press one, two, or three, and you get so used to this, your finger when using Claude Code is usually over that area. One means yes in this occasion.

Two means yes and allow all edits during the session. It's telling you that Shift +AB is the shortcut for that. And three is no.

And the other thing you can do with any of these is you can press tab and then add some more comments. If it's yes, but I wanted to think about blah blah blah. You can do that too.

But we're just going to press in this case one and off it goes and it's writing it, it's written claw.md and it's thinking some more and we will and there we go it's finished let's read what it says I've created the cloud.md file here's a summary of what it contains it's got a project overview cut a scheme development guidelines concise and focuses on actionable information okay let's let's go and take a look at it okay here we are cloud.md is right here we can right open preview, and this is what it looks like. Project overview, commands, it's got that. It seems like it is a pretty nicely structured.

It's better than the one that we've got, and then some development guidelines at the end of it. Fair enough. Okay, I like this.

I will say that I do not recommend as a general principle, letting Claude write its own Claude.md like this, doing a slash in it. I would always recommend writing a Claude.md yourself, just as we did for agents.md. We're gonna do it in this case.

We're gonna let it do its thing 'cause we also have an agents.md, but this does seem like a, like, like, this is the most crucial thing for the human supervisor to get right. So you should invest your time in claw.md rather than doing it this way. Or you can have it do the first draft and then go through it and improve it.

But anyway, for now we're going to push ahead. And for a second command to show you, a command that you will get to know and love that I run this all the time, it is /context. When you type a /it prompts you with the kinds of things you might be wanting to do, /context gives us, I mean, make this a bit bigger, a quick visual on how much of the context window is currently being used up by different things.

Remember the context window, the limited amount of space we've got to interact with, and it doesn't have a big context window. It's got 200,000 tokens. That's how long it is.

And in some ways, I think this is intentional by anthropic. They want to focus on having a really smart, powerful model and have you manage that context carefully. You can see that memory, which includes the thing that we've just built.

It includes the Cloud.md. That is using up a bit of space this purple is messages which is our interactions with it so far already just these basic interactions of setting it up has used up a fair amount and we've got this much free here and this buffer at the end is the extra space that it keeps so that it has room to maneuver to then compress everything when it needs to. This is what we call compaction, compacting the memory down to something smaller.

This is its extra buffer, so it's got some wiggle room when it gets to that point. Okay, so next command, and I mean, by next command I mean next instruction, I'm going to say, please read plan.md in the docs folder to understand everything that's been built for and any supporting docs. Okay, we'll let it do its thing.

### Putting it together

It's reading that file. We'll let it make sure that it has a very good understanding. It probably already read it after 3D ages 17, before.

If I didn't muster dunk, it knew about the model and so on. But still, it's good to be thorough about this. We're making absolutely sure that it has read this and understands it.

And it will then have that in its memory. It's done that. Okay, great.

All right, next, Bring up the, please run, please run all tests to confirm that everything is working. Bringing up the server as needed and bringing down the server at the end. Okay.

We'll give it that command. And you're familiar with this approach of instructing the alarm from everything we did last week. And now we're back to this, do we want to allow it to run this Docker build command?

Do we want to proceed? And I'm going to now press the button to I'm going to say yes, and you don't need to ask me again if you're doing Docker build commands. Oh, haha.

And it's saying the Docker isn't running because I've restarted my computer and it's actually going to open Docker for me. Isn't that amazing? Amazing.

So I forgot to start Docker so it can't run Docker because I'm not running Docker desktop, but it knows how to run it automatically on my Mac. So I'm pressing one for that, not two. I don't want it to be able to launch applications in the future.

Up comes Docker desktop launched by Claude. And this is an example. I feel like Claude Sonnet wasn't able to do things like that.

Claude Opus is that good. All right, back we go. And now it's continuing.

I'm going to press two for that, let it do its thing. I'll see you back in a moment when it's run it's testing. All right, and it did indeed run all the back end tests and all the front end tests.

It reported back that all the tests passed. And here we go. We got this lovely little table appearing here in again, in the command line.

It says that there are two deprecation warnings, but they don't matter. And it says here, so tade for 60 seconds.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We're done with you. You are dead to us. I see I've got some lint errors here, some red squiggly's underlined.

## Practical tips

- I don't remember that, I'm not sure whether I just did something wrong when I tried to accept the changes. But anyway, that's a good problem for us to have right now. As you will see, let's open up a new terminal.
- So the first thing I'm gonna ask you to do is actually exit the terminal by typing exit and then open a new terminal just to make sure it's absolutely new. You can also do this by pressing the plus button over here to have a completely new terminal and then type the word "clord" C-L-A-U-D-E. And up comes the interface for "clord code CLI".
- I will say that I do not recommend as a general principle, letting Claude write its own Claude.md like this, doing a slash in it. I would always recommend writing a Claude.md yourself, just as we did for agents.md. We're gonna do it in this case.
- Remember the context window, the limited amount of space we've got to interact with, and it doesn't have a big context window. It's got 200,000 tokens. That's how long it is.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

That seems that seems like a good progress to have been made. Let's just do a quick slash context to see where we stand. You can see now that we've got the same amount of memory used up, but the messages has now taken up a whole line and it gives you a sense of how quickly you do tend to move through this. I'm always got a healthy eye at the context usage, but so far so good.
