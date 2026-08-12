# Driving Claude Code Programmatically with Claude Agent SDK

> Week 3 · Day 3

## Overview

And we have now arrived at the part of today that I am affectionately calling the spicy part. Well, we're going to go through a few demos of other related things that we're not fully covering on this course, but it's nice for you to know about.

So you can be, you don't need to take all of those in there and remember anything. This is just to give you a quick tour of related stuff, starting with the Claude Agents SDK that you might heard of that and you might have been wondering how that fits in and how it fits into other agent frameworks that I cover in my other courses.

And the answer is of course that it's not really an agent framework at all, even though it's called the Claude Agents SDK, which can certainly give you the impression that it's an agent framework. But what it is is a way to programmatically drive cloud code have access to all of the power of the agents in cloud code.

## You will learn

- Understand the main ideas covered in **Driving Claude Code Programmatically with Claude Agent SDK**
- Follow the practical walkthrough from Week 3, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

But do it by writing code. Okay, let me show you exactly what that means. I've got here in VS code, a project I've just created called space.

And true to the name space, we're looking at a completely empty, totally empty directory with nothing in it whatsoever. And we're going to fill up this space with something. Let me show you.

And I'm going to use a UV project, which you know, I like UV if I don't listen and then Google it. I'm going to do a UV in it, dash dash bear. That's going to be up with a nice empty project.

Let's do UV Python pin 3.13. Let's go with. And now it's time to UV ads, which is the going to pip install a few things.

We will have Python dot emv to handle keys. We will have requests because you always want requests. And then let's go with Claude agent SDK.

It used to be called Claude Code SDK, and they called it, they changed the name to Claude Agent SDK. And it's worth knowing that Agent is singular. I think I might have even said agents earlier, 'cause I'm used to opening our agents SDK, but it's singular, Claude Agent SDK.

We've just done it, we've built everything, we have ourselves a.vmv, and so we are ready to build something. All right, and I just copied in my.env file from somewhere else, which has a few keys in it, like my anthropic key. And I've also written a.getignore file to get ignored that, even though we don't have a git repo, this is just an empty folder, but still, it's a good practice.

Okay, now new file, let's have a main.py. This is where we're gonna write some code. And what's our code gonna do?

We're effectively gonna like drive-cloud code using code. All right, so I'm gonna have some imports here. I'm gonna, first of all, do the whole load.env to bring in my environment variables.

And I like to say override equals true. So that the dotenv overrides anything that's set up as like a system environment variable otherwise trouble trouble. Okay, and yeah, we're gonna want an async here dot it's filling it all in.

That's not what I want. I don't want that. I'm gonna type myself.

I want to have like a prompt. What does the meaning of life is not going to be my prompt. And stop, stop, stop filling in.

And we're also going to want to have, we're gonna want to have the tools that it can use. So I'm gonna have tools equals, and that is indeed going to be some kind of a list. Okay, so what's the prompt and what are the tools?

Okay, the prompt is gonna be make a vanilla HTML plus JS HTML plus JS plus CSS website for a game of space invaders. Nope, not a piece of it, it's space invaders. That's why the reader, this folder is called space.

### Deep dive

Full stop, we won't give it any more than that, we'll just give it that to work with. Now I know what you're thinking. You're thinking I said on week one day one that that was going to be the only frivolous thing that we were going to build and everything else is going to be commercial.

Well, sumy. Alright, and now tools. For tools we're going to have all of these tools.

We'll let it have all of those. Those are the tools we're going to let our Cloud Code through Code have access to. Alright, let's write the main function.

Alright, I'm going to start by saying options equals Claude agent options. This is where we specify what we want done. You can see all those parameters that we can have, including permission mode, a whole lot of stuff, mcp servers, we can pass in all these different things and we can describe the model.

We're just going to say allowed tools equals tools. That's what we're doing. And with that, we now say async for message in query.

This is going to loop through the query where we're going to pass in the prompt equals the prompt. And just as it's saying, the options equals the options. And then we're going to print the message.

That really is it. That is our main function right there. Okay, let's do some final tidy up.

Oh, look, this looks wrong, doesn't it? That should just be.env like so. Let's just say make a vanilla HTML for a game of space errors.

And let's just tell it right. The right the code to files in the current directory, including index.html. So it's very clear what it has to do.

Let's say in here, do I remember that we could say model equals, is that one of the options here? I think so, model equals, and let's not use claud2. Let's go with Claude Opus 4.6 as our model.

That seems like a good bet to me. You should not do this by the way. You should use a cheap model.

I'm splashing out for your entertainment. It doesn't mean that you should please don't do this. Especially if you're in a tight loop like this.

Not a good idea unless you are crazy. Okay and then finally a sync IO. Oops, spell it right.

A sync IO dot run main. There we go. That should be everything.

### Putting it together

Does that look right to you? Have I missed anything? Hang on.

That's probably good. All right, let's give it a whirl. Here we go.

UV run UV what? UV run main dot pie. Okay.

And so again, it's like we're calling Cloud Code, but instead of asking Cloud Code the question, we've got it here and these are the tools that can do. We are driving Cloud Code using code. That's the idea.

We've equipped it with the tools that it may use, that read, write, edit, and we're letting it do its thing. And you can see here that it's sending back messages, oop, a file just got created. It's doing stuff, and that was our plan.

So this is how you can write code so that you're not interacting in a terminal, but rather you're structuring things as code. And it's obviously it's not something you'd necessarily need to do day to day, but if you were building something that you wanted to take advantage of this whole ecosystem with skills, with the ability to have plugins, and you wanted to have that functionality and build an app built on top of that, then you could use the Cloud Agent SDK to achieve that. And also, should you want a space invaders game and you don't want to have to type it into a terminal and interact with Cloud Code, then take this code as it is right here, I think.

We'll soon find out. Let it do its thing. I will see you back here, I think.

We'll soon find out. Let it do its thing, I will see you back here in a second. Okay, and that has now completed, took a couple of minutes.

And I do indeed see that there is, as you can see an index.html. I've got that up here in this little window here, here's a browser window for your viewing pleasure. I will double click here, and Upcome Space Invaders invaders enter or click to start It is a bit reminiscent of that first thing we had at the very beginning.

All right, let's see let me press enter, okay? Oh, it's got sound How about that and the arrow keys work? I didn't tell anything about keys Look at the score as well a score and look, there's the alien at the top.

That is absolutely brilliant. Absolutely brilliant. And the colors as well, everything here is great.

The astute amongst you will probably know that this is probably in some form in its training data.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

But do it by writing code. Okay, let me show you exactly what that means. I've got here in VS code, a project I've just created called space.

## Practical tips

- And I'm going to use a UV project, which you know, I like UV if I don't listen and then Google it. I'm going to do a UV in it, dash dash bear. That's going to be up with a nice empty project.
- We will have Python dot emv to handle keys. We will have requests because you always want requests. And then let's go with Claude agent SDK.
- We've just done it, we've built everything, we have ourselves a.vmv, and so we are ready to build something. All right, and I just copied in my.env file from somewhere else, which has a few keys in it, like my anthropic key. And I've also written a.getignore file to get ignored that, even though we don't have a git repo, this is just an empty folder, but still, it's a good practice.
- That's not what I want. I don't want that. I'm gonna type myself.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Nonetheless, I should stop playing, getting distracted. Nonetheless, very cool, very cool result, nice outcome. That of course is generated, oh, whoops, generated, look at that, look at that flickering. Generated by Claude Code wonderfully, a fully working game in Vanilla HTML and JS and CSS, built by Claude Code using Claude Agent SDK.
