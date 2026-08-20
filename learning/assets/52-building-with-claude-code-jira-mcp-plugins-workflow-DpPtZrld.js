var e=`# Building with Claude Code, Jira, MCP & Plugins Workflow

> Week 2 · Day 4

## Overview

Yesterday we covered a ton of ground with MCP and skills and plugins and sometimes it can feel a bit overwhelming with so much choice. Today we're going to put some event into action.

We're going to get more concrete about what makes a good workflow for building business functionality in Cloud Code or in the other CLI tools. We're also going to think about team interactions and about the right approach for debugging a big day, another purple day.

Welcome to week two, day four. Let's get started.

## You will learn

- Understand the main ideas covered in **Building with Claude Code, Jira, MCP & Plugins Workflow**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

As always, we begin with a recap after such a big day of the three ways to add some juice to Claude code. One of them is MCP using this standard invented by anthropic for connecting other people's tools to our Claude Code. One of them is Skills, this nice, lightweight, flexible way to take some markdown and associated commands and scripts, and using this very elegant approach that's very context friendly, adding expertise and capabilities.

And then the third, the plugins are like packages of MCP and Skills, and perhaps other things like commands and agents, putting them all together and being able to install them in one go. And of course there are pros and cons of all of these as is so often the case, and with MCP the big not so much now with some of the recent improvements, but also that they're kind of hard to work with sometimes. Skills are more efficient, they're simple.

You often get really good results with skills. Some of the negatives is that they let not as powerful, as flexible as MCP, particularly some of the things like authorization, authentication that's really built into the MCP standard is stronger. And they're still quite immature and plugins, in some ways the best of both, but it is just a cloud code thing at least as of now.

Although I think many of the other platforms have their own versions of it. And it can be tempting just to slam in tons and tons of plugins. And again, you can then start to get degrading performance if you give your LML, your Opus too much, too many options, too many possibilities.

For a start it could sometimes not know which one you wanted to use. And usually where the right way to navigate this is to think, you know what, let's start with plugins. Have a look at the plugins marketplace, maybe you'll connect to other marketplaces as we will do at some point, and then use a plugin that makes sense for you.

And then there are specific situations when you might use MCP such as when you want specific functionality and there's an ideal MCP server from the enormous ecosystem and there are specific situations and skills make sense. One of the reasons is because they're so easy to share them with others in your team. You can just put skills into your your dot-clawed folder and then check that into GitHub but commit it push it and suddenly your other team members will be able to have the same skills as you, and that's really convenient.

Okay, so for the rest of today, there's going to be no more slides. It's going to be doing. We are going to work together on going through a disciplined process, a workflow for building business functionality, using Cloud Code and using plugins and using mcp servers and maybe some skills, whatever.

We'll use a bunch of them together as a way to build out code. And this is gonna form the start of the two-day project, basically, 'cause we're gonna conclude this tomorrow with the main project, and it's gonna be something that we'll build out together. Now, here's the thing, the crazy thing about this course and using something like Cloud Code is that you can choose to follow along and do something very similar to what I do, or you could do something completely different, have a different idea and follow along with the same kind of workflow and process, but build your own thing.

And you can also choose to somewhere in the middle. You can follow the general idea I'm going to have, but then take it off in your own unique direction. This is a choose your own adventure moment.

I'm going to give you the general techniques. I'm going to give you the general workflow ideas. I'm going to give you equip you with the skills, the toolkit, so that you can go off and do some debugging.

But I'm not necessarily going to give you the exact recipe and the answers because it's going to be different for everyone. That is the crazy thing about Cloud Code and these tools generally. This is about the art of the possible, not necessarily one prescriptive path to follow.

### Deep dive

So today we're going to be building out the kind of development process that you can use yourself and that your teams can use and may well be using. And it's a process that covers the entire development lifecycle and we need to start at the beginning. Where do these things usually start?

And you might say, well, perhaps a business requirements document or a meeting with your business sponsor or something like that. But that's too, too, too, to start for me. I'm, I'm talking a little bit further down than that.

I'm talking about when things become a JIRA ticket, JIRA, something that I imagine 90% of you are very familiar with. It's, it's almost ubiquitous. Atlassian's product that's used to manage our work into JIRA issues.

And so that is what I'm going to suggest we use as our starting point. But similarly, a lighter weight version of it that a lot of people use is having issues in GitHub. And you could also start from GitHub if that's what you'd prefer.

But what I'm going to do now is I am going to do something unusual, which is I'm going to sign up for a new plan with Jira. Of course, we use it in all of the jobs I can imagine I've had for the last few jobs. But we might as well get our own version of it for our experiments, and it's free for this kind of for a small number of users.

So we can sign up to Jira for free, which is what we'll do now at at lassin.com/software/jira. I'll put a link in the resources. You don't need to do this if you don't want, because an easier way is just to use GitHub, but Jira is so ubiquitous that we might as well do it now.

So I'm going to press the get it free button to come on here Get started with Jira. It's free up to 10 users. No credit card needed.

I like the sound of that I'm going to use Google auth. I'm going to come in with my This email address come on in here. We go full name.

That seems nice. I guess I'll use my informal name continue and that's going to be my site. That seems pretty good since that's my website too.

We'll stick with that and it's thinking about that and it's all getting set up. So you should, you don't need to do this if you don't want to, part of the choose your own adventure. Should you wish to be hooked up to Jira, then please do that too.

And when you come into Jira, you should see a screen a bit like this with spaces in it. If you don't have this kind of screen or something a bit like this, you can go to this app icon up here and select JIRA, and it should take you to something like this. Spaces is like the new name for what used to be called JIRA Projects, not to be confused with something that comes up here, which says projects, which is something different, which is like for project management.

### Putting it together

Super confusing. But for people that know Jera back to front, this is all stuff you know well. So what we're going to do is do create space.

This is where you can set up your own space, and depending on quite how you've come through, you might have already had a chance to create your space. And I'm going to go for a tap, typical software development space, Camban, which is a term we're familiar with, is very standard way of doing it and now we're going to describe our space. Okay, so we're going to call our space "prelegal".

That's going to be the name of our product. "Prelegal". The idea is we're going to build a product that is something that is able to draft legal documents for a user, for a company.

It can draft an NDA, a client contract, an engagement, anything like that based on a repository of templates. And I'm calling it pre-legal because it's not meant to replace a lawyer, it's just meant to do some of the pre-work so that a lawyer, an attorney or a paralegal can be best set up or it might be a tool that a lawyer would use. So that's going to be the name of our product.

It seems like a juicy product that could use some gen AI and could be something potentially we could monetize. So that is what our project is gonna be. And for select how your space is managed, I'm going to say team managed, so we don't need to work with others across many spaces in a way.

And access will have as open anyone with access to this site, which is only me, will have access to this, and the key, which is going to be, as it tells us, the prefix that's going to come before everything, we'll just go with PL for pre-legal, something really simple. Okay, that is going to be our project, this seems good, no longer called a project, now it's got a space in we come and this is going to set up our pre-legal space that we will use going forwards and now it wants to bring team along this where we get to involve others in this and this is how you would work with your team and typically in a company set up you would have a whole team of people collaborating on one jira board as you probably know and so I'm gonna say I'll do this later and connect your work, activate, we'll just just press done there and we are done. We have pre-legal set up.

Here it is. We have our very own board. And on that note, it is quite fun to see that this is in fact a camban board, something that we're familiar with perhaps.

We'll see how its functionality compares to something we've done before. All right, so we're now going to create our first Jira issue as they're called, at least they used to be called that now they're called something different, but we're still in the same mindset of a Jira issue. Let's go and create that now.

Okay, I'm gonna press the create button. It says what needs to be done. So we're gonna put in something very simple here.

We're going to say we need a simple website that describes the pre-legal company. There we go. So that has been created and it's called PL-1.

If I click on it, it comes up. We'll see what this is.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

As always, we begin with a recap after such a big day of the three ways to add some juice to Claude code. One of them is MCP using this standard invented by anthropic for connecting other people's tools to our Claude Code. One of them is Skills, this nice, lightweight, flexible way to take some markdown and associated commands and scripts, and using this very elegant approach that's very context friendly, adding expertise and capabilities.

## Practical tips

- As always, we begin with a recap after such a big day of the three ways to add some juice to Claude code. One of them is MCP using this standard invented by anthropic for connecting other people's tools to our Claude Code. One of them is Skills, this nice, lightweight, flexible way to take some markdown and associated commands and scripts, and using this very elegant approach that's very context friendly, adding expertise and capabilities.
- You often get really good results with skills. Some of the negatives is that they let not as powerful, as flexible as MCP, particularly some of the things like authorization, authentication that's really built into the MCP standard is stronger. And they're still quite immature and plugins, in some ways the best of both, but it is just a cloud code thing at least as of now.
- So we can sign up to Jira for free, which is what we'll do now at at lassin.com/software/jira. I'll put a link in the resources. You don't need to do this if you don't want, because an easier way is just to use GitHub, but Jira is so ubiquitous that we might as well do it now.
- We'll stick with that and it's thinking about that and it's all getting set up. So you should, you don't need to do this if you don't want to, part of the choose your own adventure. Should you wish to be hooked up to Jira, then please do that too.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Here it is. It is a work item, which is used to be, I think, what we call a Jura issue. It's a task, which is the lowest level of granularity. And that's something that we've now set up in Jura.
`;export{e as default};