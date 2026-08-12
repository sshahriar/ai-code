# Claude Code Hooks Auto-Trigger Reviews with Events & Commands

> Week 3 · Day 1

## Overview

Okay, so next up we're going to look at hooks, which is one of the kind of pro features of claw code, which most of the time you don't need. But if you suddenly think, you know what, I could really use that.

It's a cool thing to know that you can do. And I would suggest that when that happens, you would then bring up claw codes docs and just refresh your memory.

So I want to give you a sense of how it works and we'll make one and you'll get a sort of the gist of it, but don't feel like you have to remember all of this. It's just one of those things that if you need it, you know how to do it, you know where to go and find out more.

## You will learn

- Understand the main ideas covered in **Claude Code Hooks Auto-Trigger Reviews with Events & Commands**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So a hook is something which in a certain circumstance can kick off making Claude code do something. And those circumstances are called events and they're things like when Claude is about to make a tool call, maybe it's about to run a shell command, or when it's just finishing work. It just thinks I'm done now.

It's moments like that, they're considered events and they can trigger a hook. They can say, "Okay, something's happened and I want to make sure that Claude Code always, when that happens, it calls something that I've fixed and advanced." That is what a hook is all about, an event triggering something that you want. So the kind of classic examples of it, there's this thing that it constantly seems to forget with me that I wanted to use a UV run instead of Python.

It always goes back to Python, which is the older pre UV way of doing it. You could add a hook so that before it calls a tool, any shell script, you always check if it's doing Python something. And if so, you say no, not Python always UV.

That would be an example of a time where you might want to use a hook. Another one from Claude's documentation, they have one where if it's ever stopping to ask for your permission, it could send you a notification so that you could just leave it running and go to the other room and rather than coming back two hours later and realizing it's not made any progress. It's been waiting for you.

You would get some kind of notification. So that's a cool one. So things like that are time to use hooks.

And then one of the absolute standard ones that are very common that we're going to use now because it's so useful is having a hook that's triggered by an event of when Claude has finished doing its work. When Claude has finished, we can seize the moment to do something else like a review. And as it happens, this is the way that the Ralph Loop thing is implemented.

I believe they've done it with a hook so that as soon as it finishes work, it's then sent a new prompt that says, "Hey, I don't think you've finished. Try again." And that's how it works. So we're going to use a hook.

Now we're going to set one up to do a review at the end of any piece of work. And like so many things, it could belong in a few places, but.Cloud is usually the place to go. It's in the.claud folder and you may already have a file called just settings.json.

But if not, I'm going to make that file right now. I'm going to make a file called settings.json. And this is the file into which you can put your hooks.

And we're going to tell this hook that we want the event to be when, when Claude is stopping. And we're going to tell this hook that we want the event to be when Claude is stopping, and we're going to tell it what we want to do. And when you say what you want to do, you've got three different types of thing, and you don't need to commit this to memory, just have a sense of it.

The three different things you could do is run a shell command, just give a command that needs to be run at that point. You could make a prompt to Claude, it could be some instructions you want to give Claude, or it could be an agent you want to give Claude or it could be an agent You want Claude to spawn a sub agent to do something and and that way it's kept off the context Those are the three things that you could you could have triggered by an event as part of a hook That's the terminology. That's how it fits together And if in doubt you can always just just Google Claude code hooks and read their docs.

### Deep dive

They're super clear. But now, let's make one that is going to do a code review whenever we hit a stopping point with cloud. Okay, so I've pasted it in the JSON that describes the hooks.

You can also do this interactively by going to slash hooks. You can then interactively. These are the different events that can trigger a hook, pre-tool use, post-tool use, post-tool use, user failure, notification, user prompts submit, session start and stop.

And we're gonna add one for stop, you can see it here, but you can add them, I can come in here and I can add a new hook that way. So you can do it all through the menus, but we're doing one for stop, and then for stop, for that event, we get to choose what are the hooks that you want to be triggered when that happens. You can also, should you wish, put in something called a "matcher" in here, which gives the circumstances a sort of filter on, in under what circumstances would this hook be called.

But if you need to do that, you can look up the docs. All right. So then you specify what do you want to happen when, when Cloud Code stops.

Well, we want to run a command. Now, as I say, three things can go there, command, prompt or agents, and the prompt and agents ones are a little bit fiddly. They have some constraints on the permissions that it has.

So you can't do things like writing to a file. It just matters how it responds. So there's various things you can do, but it takes a lot of experimenting to get it to work predictably and robustly.

The easiest one is command, which runs a shell command, and this is pretty bulletproof. And as it happens, at least I have a really cool shell command to run. You may not have done this one, but if you have, then you can experiment this with me 'cause it's so cool.

We can run that codecs exec command. That is gonna run a command on the shell prompt, which is actually going to launch a separate agent, a codecs agent. And it's gonna call call codex exec.

And here comes the same thing as before, but I'm just slightly twisting it. I'm not saying review the plan.md. I'm saying review the changes since the last commit and write results to a file named planning review.md.

That is the command. So I've put that in there as my hook. That's what we're going to be running.

And just to show it, if I go slash hooks to look in at my hooks, and I come all the way down to these stop hooks, or there are more hooks, actually, I'd gone, I stopped after that. But there's also sub agent start and stop. There are hooks you can have for minutes about to compact.

### Putting it together

So just before it compacts the context, you could you could shove in extra, reminders. You want to stay in there. The session end is when an entire session is ending, when it's asking for permission, when it's setting up, and then here are some other things.

Task completed. All right, anyway, we are going in to stop, and you can see that that codecs exec is in there. That is the one that I'm showing you on the screen here.

By the way, I should also mention I just deleted the the command and the sub agent that we configured earlier to keep things nice and simple. So there are multiple ways to review changes and things. And so we don't have don't have this in two places.

So we've just got this hook and it's time to try it out. And so now I'm going to say, please make a concise readme.md for the project. And so I'm just running that command in normal cloud code and so Claude is going to go ahead and make a read me it's going to search to see what's going on and then make a nice concise read me and what we're hoping to see is that when it's finished it's going to trigger this stop hook and we should see that here and what we probably won't see straight here but what we should know is that it's then going to spawn codecs behind the scenes.

So I want to make this edit. I'm going to say yes, go ahead and make that edit. And now, now behind the scenes, done, it's finished, it's running the stop hook.

And so that stop hook is now running. And what we know is actually happening is that that is launching codecs separately, running this command you see here. codecs is going to look at what's changed since the last commit.

And codecs is going to look at what's changed since the last commit and codecs is going to use that to write a file review.md and it completes and that's really cool. That all happened as a command launched as part of this stop hook and you can see that what Claude says is that Claude is done, the readme covers the essentials, Claude isn't aware that codecs has come in and done a code review. And it's also, part of that review, it's noticed that I removed, like I said, the sub agent and I removed the command that we don't need anymore.

And it sees that as a potential workflow regression. And then the read me that mentions that it's got some things that don't haven't yet been implemented, but that doesn't sound too severe. But it's cool that everything works.

We've got this workflow happening, and that is what hooks are. And as I say, the main thing about hooks is that you shouldn't use them unless you need to. They're one of those extra complexities that might be handy for your situation.

But wait until you need it.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So a hook is something which in a certain circumstance can kick off making Claude code do something. And those circumstances are called events and they're things like when Claude is about to make a tool call, maybe it's about to run a shell command, or when it's just finishing work. It just thinks I'm done now.

## Practical tips

- It's moments like that, they're considered events and they can trigger a hook. They can say, "Okay, something's happened and I want to make sure that Claude Code always, when that happens, it calls something that I've fixed and advanced." That is what a hook is all about, an event triggering something that you want. So the kind of classic examples of it, there's this thing that it constantly seems to forget with me that I wanted to use a UV run instead of Python.
- It always goes back to Python, which is the older pre UV way of doing it. You could add a hook so that before it calls a tool, any shell script, you always check if it's doing Python something. And if so, you say no, not Python always UV.
- I believe they've done it with a hook so that as soon as it finishes work, it's then sent a new prompt that says, "Hey, I don't think you've finished. Try again." And that's how it works. So we're going to use a hook.
- And we're going to tell this hook that we want the event to be when, when Claude is stopping. And we're going to tell this hook that we want the event to be when Claude is stopping, and we're going to tell it what we want to do. And when you say what you want to do, you've got three different types of thing, and you don't need to commit this to memory, just have a sense of it.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

If so, skim through the docs, you now that you've got the sort the basic lay of the land. You understand that settings.json or you can do it through the menus and that you have an event that will trigger a hook and that you can have command or a prompt or an agent that is triggered as a result. The command is the most predictable one. That's basically what you need to know.
