# Adding an AI Digital Twin Chat with OpenRouter & Vibe Coding

> Week 1 · Day 4

## Overview

Okay, and now I'm going to do a Control C to stop the server from running. It's no longer running.

I'll clear that screen with clear. Okay, it's time for us to add some functionality.

We've got another way to prompt our LLM. We want to do more.

## You will learn

- Understand the main ideas covered in **Adding an AI Digital Twin Chat with OpenRouter & Vibe Coding**
- Follow the practical walkthrough from Week 1, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

So at this point, I want to mention that it's important to be taking backups as we go to be checkpointing because at any point, particularly when you're yoloing, you could mess everything up or the agent can mess around and you have to start all over again, which would be a pain. Now, the right way to do this is using Git and using features of Git that allow us to commit at various points. And we will be doing that in the future.

And if you know how to do that already, then for sure, do that. But otherwise, the simple way to do it, the poor person's version of Git is simply to copy and paste, to duplicate the entire folder, site and keep a backup of it that way. That way you've got a snapshot that you could always switch back in if you need to.

So make sure you've done that, just in case what we do next, messes everything up so you can always recall. And if you know how to use Git, then of course just commit. And be careful of the fact that there's a, like already gonna be a Git repo under the web directory that you'll need to to remove and then just have one Git repo.

If you know that, if you don't, just take a copy. All right, now time to ask our agent to do more. Okay, so here we go.

I'm going to paste in here my next instruction. That's great. Please now add the ability to have an AI chat with a digital twin, which can answer questions about my career.

Please use OpenRooter. My OpenRooter API key is in the.env file in the project route. Please use the model named.

Okay, and now I just want to bring up OpenRooter itself. This is OpenRooter. If you go to the models page in the main navigation, we can look at all the different models that OpenRooter offers.

If you type free, you get to see all the free ones. I want to look for ones called GPT-OSS, which is OpenAI's open source models. There's a free version and a paid version.

The free version, you can only use it occasionally. I'm going to pick the paid version, it's still super cheap, but you can choose to use either. This is the version, I need to refresh that, and then I'm going to copy that model name into the clipboard, go back to cursor, paste that in here.

Like so, that is the name of the model, that is all I need to do, make the changes, changes, make sure it works, let me know when ready for me. That's all. Let's set that going.

Off goes our AI agent. I will see you back here in a few moments when the yoloing is complete. Okay, well, it tells me that an AI digital twin is wide up and ready.

The site now includes digital twin. It calls open router. It uses the.env file.

### Deep dive

It's given me the instructions. What do you think? What's your bet?

Is this gonna work? Is this gonna work? Let's see.

We have to be in the web directory, which is where we are, PwD, there we are. We do npm run dev. Well, it hasn't crashed.

Now let's bring up a browser. Here's a browser tab. Hold on, make that a nice size for you.

Sorry, one second, one second, I know it's exciting. Okay, here we go. So, after faffing around with that, we can go to localize 3000.

And here comes a website. It's scrawled straight down originally. I wonder if it meant to do that to do digital twin, chat with an AI version of ed to explore career milestones.

Look, it's all got the same side. It is a beautiful side, by the way, I have to say. Here we go, we scroll down and here is the digital twin section.

Very interesting, it doesn't look like a traditional chat, but it has these buttons and things. All right, shall we try chatting with the digital twin? Okay, let's give it a shot.

Hi there. So I said, hi there, it's slightly janky, it like bounced around a bit, but I said hi there, look at how it's showing here. Hello, I'm digital twin of Ed Donner.

How can I assist you today? Pads with insights on his work, blah blah blah blah. What are you most proud of?

Let's see what we get. What, what is this guy ad most proud of let's see I'm most proud of turning a vision into tangible impact building their bill up in the ground up as the founders are very nice what a nice answer watching thousands of professionals fine roles that genuinely fit them the clearest proof that technology can serve a deeper human focus mission nicely put so here we have it we have a digital twin it's it's interesting the way it's showing it here. It's actually quite nice.

It's different. I've seen many digital twins and they don't tend to look this way. So I do quite like it.

### Putting it together

I have to say, even if it's not the traditional approach, but very nice, it does seem to be working. And presumably it's calling open router. Well, this is really showing you.

I'd say that the good and the rough edges are vibe coding. This looks pretty good, I have to say, but there's definitely some weird stuff. Like the way when it opens up, it flips down straight to that section.

I do believe some of this navigation at the top here, some of it works, career journey works nicely. Does that portfolio work? Oh, that works as well.

Digital twin. Oh, okay, at one point, I think this wasn't working, but it does seem to be working right now. So that navigation is working, but yeah, there's the, another thing that doesn't work, these buttons here, I tried pressing that button and nothing happened.

So there's definitely some things here that are a bit broken. And this is where you have to go back and iterate, iterate, iterate, and improve and see what can be done by going backwards and forwards. And it is a good idea to keep backups.

You should really do it using Git, but make sure you can always go back if it ever does something that should be reversed. And of course, the main thing to keep in mind here is that by genuinely vibe coding with YOLO, we've sort of broken all of the rules that I said at the first half of today's session. We didn't work on an agents.md.

We haven't really been checking as we go. And that's fine for this kind of MVP and for experimenting and exploring. But if we wanted to take this further, it would now be important to take a moment and come back through.

First of all, test everything thoroughly and fix up things that we're not satisfied with. It's rated on things like the prompts and look in at the code. And for example, now let's take a look inside web and find out what has this actually built and do we understand it.

And so for example, I can come in into web, into source, SRC, and come in here, look inside app, and here we could look inside API, and you'll see that there is something called root.ts under API chat. And if I open this up, this is where we will see the backend code that's getting run, which is where it is going to be able to call open, call open router. Now let's make this a little bit bigger and push our agent over to the side and take a look at what's happening here.

And you can see the code that is going to make that request to the LLM. And we can now look through this and get a sense of what's going on.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

So at this point, I want to mention that it's important to be taking backups as we go to be checkpointing because at any point, particularly when you're yoloing, you could mess everything up or the agent can mess around and you have to start all over again, which would be a pain. Now, the right way to do this is using Git and using features of Git that allow us to commit at various points. And we will be doing that in the future.

## Practical tips

- So at this point, I want to mention that it's important to be taking backups as we go to be checkpointing because at any point, particularly when you're yoloing, you could mess everything up or the agent can mess around and you have to start all over again, which would be a pain. Now, the right way to do this is using Git and using features of Git that allow us to commit at various points. And we will be doing that in the future.
- And if you know how to do that already, then for sure, do that. But otherwise, the simple way to do it, the poor person's version of Git is simply to copy and paste, to duplicate the entire folder, site and keep a backup of it that way. That way you've got a snapshot that you could always switch back in if you need to.
- So make sure you've done that, just in case what we do next, messes everything up so you can always recall. And if you know how to use Git, then of course just commit. And be careful of the fact that there's a, like already gonna be a Git repo under the web directory that you'll need to to remove and then just have one Git repo.
- If you know that, if you don't, just take a copy. All right, now time to ask our agent to do more. Okay, so here we go.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And most importantly, we can see the prompt that's being used to tell it who I am. And we may decide, look, this is quite simplistic. This is just a very basic prompt. We really wanted the whole LinkedIn profile with all the information to be sent to the chatbot so that it could give us the most robust answer.
