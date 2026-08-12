# Claude Code Commands, Shortcuts & Configuration Deep Dive

> Week 2 · Day 2

## Overview

Well, it's another yellow day. Welcome to week two, day two, our second day of getting inter-cloored code, and we're going to get deeper.

And you know, I love to load code, and hopefully you're getting get in the cloored code bug yourself. And maybe you also enjoyed some of the others we saw yesterday.

Let's quickly recap. And all the way back in week one, day one, I'd shown you this landscape of coding agents showing it to you again here.

## You will learn

- Understand the main ideas covered in **Claude Code Commands, Shortcuts & Configuration Deep Dive**
- Follow the practical walkthrough from Week 2, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We've got IDEs, plugins, which is mostly the same, and CLI. And in the IDE camp, we've got cursor, anti-gravity, windsurfing, we didn't look at. In plugins, we've got GitHub co-pilot and codecs.

I realized, I think when I showed you this before, I put codecs in IDE, and it doesn't really matter, but I guess codecs actually a plugin into VS code. And in CLI land, we've looked, of course, at Cloud Code and cursor and codecs also came out with CLI versions really really because of cloud code success and so did Gemini. So with Gemini, you've got like Gemini CLI and you've also got anti gravity as like two different products for using Gemini's models for agent coding.

for a gente coating. And then yesterday we also had some fun with open code and AMP. And if you've fallen in love with either of those two and they're different models, then you should use them for the rest of this week for sure much of what we're gonna cover is in common in them too.

And I need to say this is of course a massively rapidly evolving category. There's stuff coming up all the time. And there's also plenty of ambiguity with even with Gemini CLI versus anti-gravity.

So keep an eye on the resources, ask me questions if anything is unclear and you know remember my view is that Claude Code is here to stay. There'll be lots of other things going on all around us but this is me anyway, this is my favorite of the bunch. And on that note we're now going to go back to Claude Code and experiment with some commands.

The main topic for today is to be looking at different commands in Claude code, including as part of that things like check pointing. So as I said, let's go over to Claude code again and we'll work through some of the commands. Okay, and here I am back in VS code and I'm in my very same PM project.

Why not? And here I am in a terminal and and I'm going to type exit, because maybe this terminal is still set up with some of those environment variables we were messing around with yesterday. Let's have a completely fresh terminal.

I think yes, control and shift and back tick always opens a completely new terminal. It's a little extra trick to know. Now, if you're going to follow along in Claude code, then you can do exactly what I do.

If you're in one of the other IDEs, then you should look up what their commands are. But I think in most of them, maybe all of them commands are always with a slash, and then the name of your command once you are in your platform. All right, with that, I'm going to go into Claude, by typing Claude, and here we are, we're in Claude code, let's work with some commands.

Okay, so once you're in Claude, doing a slash, lets you run different commands that don't get sent to Claude, that actually just get run in the tool. And the easiest way to find out all the commands you can use is just to press the down button now and read them with a little descriptions of them. That tells you everything you need.

You can also do slash help and get a quick summary of important commands, along with some shortcut keys. You can see they're useful shortcut keys to know how to do various different things. Okay, and now let's try out some of the really common commands.

Well, I'm just gonna press escape to get out of that screen and then I'm gonna do, well, we know slash init, init sets up the project. The first time you come to a project, it writes a new cloud.md as it says, and I sometimes suggest to think about doing that yourself manually rather than doing slash init, but it is your choice. All right, other things we already know, slash model, that tells you the model that you're using and lets you choose a different one.

And I've got the default one, which is using opus, because I've got the big plan, escape out of that. You know slash status, that gives you the lay of the land, tells you what version you're on and stuff like that, gives you a set of the different settings, and it shows you your usage so far for this session and for the week. Those are some commands that you've seen already.

### Deep dive

All right. And then a command that you've also seen already, which you know I use all the time is slash context. All the time.

This gives us our beautiful memory printout. Let's make that nice and big and happy to see it looking so empty after we started the session again. That looks great and this is something that I do all the time as you know.

And along with that, there are a couple of commands that go hand in hand. One of them we've also already met, which is compact, which kicks off a compact and resets everything, and it's worth doing that yourself, not letting it get into this dangerous territory and running it for you while it's right in the middle of doing some work. That can cause troubles.

It just can cause a lack of coherence and problems to go off the rails. You can also type compact. And then as I said before, just put some summarization instructions here about what information you particularly want to keep.

Personally, I prefer to put those sorts of bits of information in Claude.md myself. I rather play a primary role in controlling its information that way. But you should experiment and it gets better and better at this kind of thing as well.

Maybe my knowledge is set from a few months ago of using it. And then the other one to use to know that the other one also begins with the letter C that goes along with context and compact is the one that's clear, a very dangerous one to use. What Clear does is absolutely wipes the composition history.

It's the same as basically exiting and starting a fresh Claude. You do this to reset everything so that it's back to reading the agents.md. It's as if you started up a new cloud.

Sometimes it's liberating to do this. I actually like working this way. I like to keep my cloud.md's up to date.

I tell it to write its own files. I make sure that everything is tidy and up to date and then I just either just do a slash clear or I get out of cloud by doing control C twice and then launch cloud again. And I do a context to see that everything is nice and clean and fresh and that's the way I like to work.

But often the compacting works pretty well too and of course it's much faster to do it that way. Okay, another one to show you is /config. I do that, it shows me it's actually the same as the second page of the stats that we were looking at before the status.

But it's sometimes useful and / usage takes you to that third page. And then the other one I wanted to show you, yeah, is actually a slash stats, similar to status, but stats. This gives you a rather pleasing diagram of your usage of Cloud Code there.

There you see an overview and the models, tokens per day, for whatever reason mine, and look at that, it shows my moonshot, kimike too at the bottom there. For whatever reason, my history is only as of this year or I've used Clorco for some time. Maybe that I changed the plan.

But this is what it shows, but if you've been using Clorco for a while, you'll see a nice, busy screen there. And this is fun to track to see as you are using the platform. Okay, and over time, we're gonna learn some of the key shortcuts as you get more comfortable familiar with it But once and though perhaps that's used it used to be used a lot more than it is these days is shift tab shift tab switches to accept edits on which means that things just get Accepted and shift tab again is plan mode on that's back to this idea of a plan mode where it plans out first and plan mode where it plans out first.

### Putting it together

And yeah, the plan mode is something which is not used as much anymore because now it tends to be good at deciding itself when it's right to be planning and when it's right to be doing. So particularly with Opus, it's less necessary to force it to be on a plan mode. And yeah, except edits on, just means that it's going to accept file edits.

It's not quite the same as Yolo mode on Cloud that we are going to do proper Yolo mode at some point. Okay, so that is some of the really common I can put it back to normal. Some of the very common shortcut keys.

Another one you might want to look out for is Ctrl O puts it on a detailed transcript mode, detailed press control again to toggle that off. When it's on that detail mode, you get a lot more information printed, and that can be pretty interesting to see everything that's going on should you wish to get the gory detail. Okay, that's some of the common commands in Cloud Code.

And then just some other things to mention about the setup of Cloud Code, there is at the top here, you'll see a directory called.Cloud that has been creating for us as we've been going. And in there are some settings in a JSON file. And if I show you this, you know all those times when we've been pressing the button to to say, okay, I accept you can do this.

And by the way, you can do this again in the future. Whenever you do this, Cloud Code adds a line in this JSON file with all of the things that it's allowed to do. And if you wish you can come in and edit this permissions file directly yourself and give it the ability to do any of these things That gives you this kind of instant ability to manage the permissions that it's doing and you can also remove a permission by just taking out of the JSON here There's also a command slash permissions which you can use To see the different permissions that it's got to add a new rule and to remove a rule and so on.

But it's easy to edit it directly here too. And a final thing worth knowing is that within Cloud Code you can use the @ sign to represent a file path, the contents of a file. And that's a good trick for knowing about when you're building some of these various files that Cloud will read.

So to give an example, I can go into Cloud.md right here. This is our Claude.md. And if I want the plan to be in this file, then I can come here and I can just say, plan, detailed plan, as a heading, let's make that a heading like that.

And then I can just do at, and now I can put the path to that detailed plan. So I can say docs/plan.md. And that plan file will now be inserted in there and included in the cloud.md file.

And that is a common trick. Another neat trick that some people do is that if they want to be able to have an agent.md and also have a cloud.md file and they want it to be the same so that you could either use cloud code or be using GitHub co-pilot and have it access to the same information. Then they don't write a Cloud.md at all.

Instead of the entire Cloud.md, they just have a single statement which is at agents.md. That basically means that Cloud.md is just the contents of agents.md. That that way you can maintain one file rather than two and it refers points to agents.md.

So that's a nice trick to know about and some people use that to have one file rather than two. And you can use that at syntax in a claud.md file or you can use it just in a prompt to claud and it brings the contents of the file into the context. So it's to be used with care because it will fill up your context very quickly if the file is a long file.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We've got IDEs, plugins, which is mostly the same, and CLI. And in the IDE camp, we've got cursor, anti-gravity, windsurfing, we didn't look at. In plugins, we've got GitHub co-pilot and codecs.

## Practical tips

- So keep an eye on the resources, ask me questions if anything is unclear and you know remember my view is that Claude Code is here to stay. There'll be lots of other things going on all around us but this is me anyway, this is my favorite of the bunch. And on that note we're now going to go back to Claude Code and experiment with some commands.
- I think yes, control and shift and back tick always opens a completely new terminal. It's a little extra trick to know. Now, if you're going to follow along in Claude code, then you can do exactly what I do.
- If you're in one of the other IDEs, then you should look up what their commands are. But I think in most of them, maybe all of them commands are always with a slash, and then the name of your command once you are in your platform. All right, with that, I'm going to go into Claude, by typing Claude, and here we are, we're in Claude code, let's work with some commands.
- Okay, so once you're in Claude, doing a slash, lets you run different commands that don't get sent to Claude, that actually just get run in the tool. And the easiest way to find out all the commands you can use is just to press the down button now and read them with a little descriptions of them. That tells you everything you need.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

But it's a powerful way to bring information into context, whether it's in Cloud.md or in the prompt. And if you do a directory there, if you do add and then a directory, it just brings the listing of that directory. It doesn't bring all the files in that directory. It just brings like a list of the files into the context.
