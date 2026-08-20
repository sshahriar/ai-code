var e=`# Claude Code Plugins Marketplace, Installation & Best Practices

> Week 2 · Day 3

## Overview

And finally, last but definitely not least, plugins. And again, I have some green and some red, some pros and some cons.

Let's dig in. So plugins are the highest level idea.

And a plugin is a bundle of stuff, a bundle of features. It can be a bundle of one or more MCP servers, a bundle of skills, a bundle of commands, things that we do slash and then something, along with some other stuff that Claude Coquan do, like hooks that I haven't explained yet, but that we will do.

## You will learn

- Understand the main ideas covered in **Claude Code Plugins Marketplace, Installation & Best Practices**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

But all of these things can be packaged up together into plugins. And plugins is the most new idea of the ideas. Plugins came in October 2025.

So that's a sort of, came at the end. And I rather suspect that plugins came along partly because people were getting a bit fed up with the weird discovery jankiness. So there's never quite clear where you go to find things.

So plugins have kind of sorted out this idea of having proper marketplaces, having somewhere authoritative to go to understand the source of these things and to package things up in a better granularity. But unlike mcp and skills, plugins only applies, at least as of now, to Cloud Code. It's like a Cloud Code thing.

You don't have plugins and to chat GPT or anything else. This is like anthropic Cloud Code plugins and it's designed specifically for Cloud Code. So it is the most simple idea of all is just just install a plugin or don't it's something which It allows the the people who implement the plugin to decide how we're gonna trade off what should be an mcp server What should be a skill?

We're not gonna worry the user about that will take will figure it out and take care of it and package it into a good plugin and You do need to explicitly trigger commands. You type them out and that removes some of the sort of hand waviness of, oh, is this gonna pick up or not? So it makes, it makes, just makes things a little bit more, more bulletproof.

Now that goes, there are some downsides. There's always some downsides. There's some downsides.

The first of them, I don't know if it's a downside, but it's like a limitation that it's just a called code thing. It's the one that's sort of the least configurable. You just install the plugin and it's in.

And you know, there's always the risk that in doing so it's quite a broad brush stroke. You're bringing in a whole kind of package of stuff. And maybe you'd rather mix and match or make these decisions yourself.

But that's not what plugins are about. They're about like bringing in this new ability. And so the simple bottom line is that whilst all of this stuff about MCP and skills is kind of complicated and I've given you lots of complexity to navigate, the bottom line is, most of the time, just start with plugins.

If there's a plugin that's going to work for you, then you don't really need to worry that much about whether it's MCP or skills or whatever else, install the plugin, you got the plugin installed, you can then you'll see we can enable it and disable it when we're using it when we're not. And so that just gives you a way to keep things simple, stick with plugins unless you know better, unless you want stock prices, and you particularly want to install the polygon massive MCP server, because that's what you need to do. The Cloud Code to be able to do.

If you need that, then that makes total sense. You do your research, you install it. But most of the time for most everyday activities we will do plugins is the way to go.

And as it happens, you're already something of a pro with plugins because you've used them already. Or at least you've seen me use one already. I don't think you've used it yet.

### Deep dive

Uh, you know what I mean. Do you remember me using a plugin? Give you a second to think about it.

Yes, well maybe no. I don't know if you got it or not. But if you did, congratulations.

Yes, the Ralph Loop thing. Remember when I kicked off Ralph Loop, and I think I said, don't worry, you shouldn't run this, but I'm going to blah, blah, blah, blah, blah, blah. That was a plugin.

The Ralph Loop is a plugin that someone wrote that has a bunch of stuff including a command and we ran the Ralph Loop command and that caused that craziness yesterday with all sorts of stuff going on. So that was our first example of using plugins. Let's go now and have a look at more plugins.

So the marketplace for plugins is something which can be directly accessed within Cloud which I will show you but also the main one that it links to is this Cloud plugins official is a repo in anthropics github and so you can come in here and see it and you can see it explains the structure of the different plugins that it's got and you can come in and see that there's a directory called plugins and one called external plugins. And this has a bunch of different plugins that we're about to see within Cloud Code in plugins, which are written by anthropic and then external are ones written by other people. They've got people like context-driven, that's a familiar one.

They've got GitHub, the GitLab as well, and Playwright for browser automation and Slack and Stripe and Superbase. So lots of plugins here in the official repository that are going to be very, very useful. Now let's go into Cloud Code and see how you access these directly.

Okay, so I'm just first going to, we're looking here, if I first do slash skills, you can see that we've got this agent browser skill right here. You can see that we've got this this agent browser skill right here. So what I'm going to do is I'm just going to, I'm going to come out of Cloud Code and I'm going to right click on skills directory here and I'm going to say delete, move to trash, it's gone and now I'm going to start Cloud again and I'm going to do slash skills and I just want to show you that there's now no skills found.

Uninstalling a skill is just a matter of deleting the directory. That's it. OK, so back back to plugins.

I'm going to do slash plug-in. And that is the way to launch the sort of in-cloud code experience of looking at these things. And you can see that there's these three tabs discover, installed, and marketplaces.

And if I flip between them, you can see that we've only got one marketplace that I'm linked up to. And it's the Claude plugins official marketplace. And that's the marketplace that you will be linked up to too.

And you can install additional marketplaces, which you would only do you do with care and only to a marketplace that you trust. And a classic example might be that your own company might have an internal marketplace, or you could have one for your team. It could be one you just need to have access to it in Git.

You give like a GitHub address. And then you can have a marketplace here, which is how you could mix and match plugins between your team members or between other people at your company. So it's so clever, so powerful.

### Putting it together

And you can also add in other sort of legitimate ones that you know about new trust. But we're going to stick with the Claude plugins official marketplace, which is in by default. We've got no plugins installed right now.

I did. I used to have one that I that I uninstalled. I used to have the Ralph Lute one that I removed before showing you this.

And Discover is where you can find new plugins that are part of the marketplaces that you have active. And these are ordered by the most popular with the most installs at the top. And the one that has the most installs of all is one called front-end design, which creates distinctive production-grade front-end interfaces.

And a lot of people talk about this plugin, it's meant to be really amazing. And we should definitely install that. So let's press space to say we want that plugin for sure.

Next up is context seven. That's fun. They've got a plugin as well.

It just it just installs upstashes context seven mcp server. It's just the same thing. It just gives us this easier way.

I think I told you when I was when I was saying how difficult it was to to discover mcp servers that you can also do it through plugins and that's exactly what we're doing right now. Code review is something which is like an official and throw pick written way to do a code review for pull requests. That's pretty cool.

I say we want that. GitHub, this is one that installs the official GitHub MCP server. We're gonna actually install that MCP server directly ourselves and we'll probably, I think we're going to do that tomorrow.

Feature dev, I don't think we want that right now. But this one, code simplifier with 51,000 installs. This is anthropic, open sourcing their own internal agent that they have built, which is able to simplify code, particularly code that might have been written by LLMs, that might have what people call LLMs, slop, lots of overly complicated constructs.

The code simplifier is an example of an agent, which we haven't really, we certainly haven't talked about having agents yet.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

But all of these things can be packaged up together into plugins. And plugins is the most new idea of the ideas. Plugins came in October 2025.

## Practical tips

- So that's a sort of, came at the end. And I rather suspect that plugins came along partly because people were getting a bit fed up with the weird discovery jankiness. So there's never quite clear where you go to find things.
- You don't have plugins and to chat GPT or anything else. This is like anthropic Cloud Code plugins and it's designed specifically for Cloud Code. So it is the most simple idea of all is just just install a plugin or don't it's something which It allows the the people who implement the plugin to decide how we're gonna trade off what should be an mcp server What should be a skill?
- Now that goes, there are some downsides. There's always some downsides. There's some downsides.
- The first of them, I don't know if it's a downside, but it's like a limitation that it's just a called code thing. It's the one that's sort of the least configurable. You just install the plugin and it's in.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It's another thing that comes in the mix with plugins, but we'll install that too. And I think the next one, the next one is hopefully familiar to you, is the Ralph Loop that we used to have that I'll leave uninstalled for now. And then we will talk about LSPs as well later. Okay, so that's a useful bunch of plugins.
`;export{e as default};