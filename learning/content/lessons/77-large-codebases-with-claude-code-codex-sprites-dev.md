# Large Codebases with Claude Code, Codex & Sprites.dev

> Week 3 · Day 3

## Overview

This is the start of the crescendo towards the finale of this program. This is week three, day three, another purple day, another core learning day of skills, and this is the day when we look at what it takes to build large code bases, working with with big teams, working together with platforms like Claude Code and Codex and Open Code and so on, professional coding agents in large teams.

And originally that was going to be all I was going to cover today. I was going to have a whole day talk about large team work and I had some stuff prepared and I was thinking we would dive in and take a big open source repo and kind of work on it.

But what I sort of realized is that we've already covered all of the foundational skills, so this is more about summarizing and packaging it all up and explaining the do's and don'ts. And that will be boring to be an entire day, especially this late in the game.

## You will learn

- Understand the main ideas covered in **Large Codebases with Claude Code, Codex & Sprites.dev**
- Follow the practical walkthrough from Week 3, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We're not up for a boring day like that. I can cover that material quite quickly. And then, and then, I've got some spicy topics, some spicy things to throw into the mix to keep things sizzling.

So prepare yourself, be prepared for some spice. Let's get through the large cobay to work place, some good stuff, some vegetables to get through first, and then we will bring on the fun. All right, let's get started.

Now I'm gonna start with another recap, and I realize this is like the third day in a row of recapping the same material, but I feel like I gave you a lot to digest on the first day. We keep the food down as we go. A lot to digest.

And before we get to the spicy stuff, if I'm not carrying this too much, it's worth us taking one more moment to look at this. Slash commands, we know, include code or how you run commands. And there is a way to configure your own as I showed you, although these days it's more common just to use skills.

And skills of course consistent across Cloud Code and codecs, and I think everyone is really jumping on the skills bandwagon to a large extent, they're kind of taking over from MCP as being the way that we like to build functionality into these coding agents. Then multi-agents, which is just this idea of running lots of cloud code at once, or maybe kicking off codecs to run as we did, which was really cool. Or now we know how to throw into that, like running multiple clouds that might be on the internet, like out on the cloud, perhaps because we just raised a bunch of GitHub issues and we've tagged cloud in them.

And that means that cloud just goes off and doesn't. Or perhaps we're using something like sprite stop dev to run on a remote container, a remote sandbox on the cloud, running lots of clods. All of these things are possible.

Those are multi agents. Sub agents is something that's a bit more contained. It's when when you really delegate one particular task to a sort of sub instance of Claude that just keeps that context, takes care of that, and then returns the results.

And one of the built-in ones that's used a lot is the exploration sub-agent. They can just sort of go off and dig around a lot of files, read them all, summarize them, and return that back to the Claude Code context. So that's multi-agents and sub-agents, and of course you can create your own sub-agents and have them able to carry out a task.

Agent teams, we talked about a bit but we didn't actually use them. We're going to do them tomorrow. They are where we start to get a bit more kooky and have things like swans and orchestration and stuff like that.

Hooks is something very specific when you want to be able to tie something that's going on like like Claude using a tool or something like that, and have that always triggering, running a command or sending a prompt to Claude or kicking off a sub agent. And you can configure it that way. And it's, you know, used only occasionally, but they do sometimes come packaged in with plugins.

And speaking of, you can also create your own plugins as I showed you. You can package up different plugins that can contain things like skills and subagents and commands and you can package them up together and you can also put them into a marketplace and you can then publish that marketplace and other people can bring in your marketplace and then choose to add in your different plugins. So that is how you'd create a plugin, not something you'd do every day, but something you might do as part of a larger project as we'll get to today.

### Deep dive

So that's the quick recap on the different pro features that we covered on week three day one. And then yesterday we had such an interesting time looking at sandboxing. It's a very important topic when you're thinking about being able to do more yoloing, kick off claw to do more, but there are serious security risks doing that on your computer with your file system, with your network access, running shell scripts on your computer.

That's where sandbox has come in. Built into Cloud is the native sandbox, and it's also built into some other tools like we saw in cursor, but in Cloud Code, it's just slash sandbox, and then you're running in a lightweight native sandbox. Then we also found out all about using like managed cloud on the web.

And you could have like cloud on the web and just through a web browser kick it off. You could do it through a mobile app. You can have it so that it's hooked into GitHub, so that a GitHub action, you tag cloud and cloud just goes away and does the work.

And then you find that there's a branch that's been pushed. There's a PR ready for you with the change made, just because you tagged Claude. It's amazing.

And so yeah, obviously I hope you shared in my joy with that and I hope you've been trying it out 'cause it's really great. The thing I didn't get to do yesterday but you hopefully did is just that simple trick of putting an ampersand before a command to Claude, which means don't run this here. Take this whole conversation so far, push it out onto the internet and run it in a remote cloud and then get back the answer.

It's really amazing that you can do that. I guess you don't get back the answer. It runs remotely and then you probably saw you could do slash tasks to come and look at them.

So that is a really cool feature of a cloud code on the web. And then there is third party sandboxes. It's a bit of an up and coming feature.

I showed you sprites.dev that I'm super impressed with. Just as they say, it is really, really quick. And it's just very easy then to run on Yolo mode, on the cloud, on a fast box.

And it is, so it is stateful in that you can just come back to it and it's exactly where you left it. And again, it comes up really, really fast and it's got everything just as you left it. So you can use it as a little home away from home.

And that's really amazing for developing. And the fact that Cloud Code, it runs in the terminal like that, means that it's just so convenient. You just run it there in the terminal remotely and you have access to your Cloud wherever you are.

So that is sprites.dev. I absolutely love it, and I hope you were impressed with that too. And here I am back in VS Code again in the finally repo.

### Putting it together

And I've got two terminal screens. One of them is just a terminal, as usual, normal terminal in the finally directory. This one here says Sprite on it.

This is just the same one as I had yesterday. And it's weird that it looks like this is just a terminal like any other, but of course, this is actually connected to my remote box, my sprite box, out there, somewhere. And I actually kept going.

Yes, sir. I couldn't resist. I couldn't stop.

It was the end of the recording, the end of the day. But I just had to keep going. I asked it to do one more thing.

I asked it to update all of its documentation, to have one summary document. 'Cause I thought that would be nicer. And then I also asked it to make a little demo called Market Data Demo, so that I could see for myself that was actually doing something and working.

And I asked it to push that, which of course it did. And I then came to my other, my local machine here, and I already did this. I did like a git pull, so that the latest code would come down to my computer.

And then I thought, all right, now it's time to try out this demo. Let's see what it looks like. So I asked it for a demo that could run in a terminal, like this, like not a fancy graphical demo that could prove that the market data simulator was working and able to generate market data.

So I see the backend, and then I wanted to go UV run, market data demo. That's what I should be able to do. Let's see what happens.

Whoa. (laughs) Wow. So take that over a second.

So you'll see a bunch of tickers here. Prices changing here. This is the change appearing in red and green and things happening.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We're not up for a boring day like that. I can cover that material quite quickly. And then, and then, I've got some spicy topics, some spicy things to throw into the mix to keep things sizzling.

## Practical tips

- Hooks is something very specific when you want to be able to tie something that's going on like like Claude using a tool or something like that, and have that always triggering, running a command or sending a prompt to Claude or kicking off a sub agent. And you can configure it that way. And it's, you know, used only occasionally, but they do sometimes come packaged in with plugins.
- So that's the quick recap on the different pro features that we covered on week three day one. And then yesterday we had such an interesting time looking at sandboxing. It's a very important topic when you're thinking about being able to do more yoloing, kick off claw to do more, but there are serious security risks doing that on your computer with your file system, with your network access, running shell scripts on your computer.
- And so yeah, obviously I hope you shared in my joy with that and I hope you've been trying it out 'cause it's really great. The thing I didn't get to do yesterday but you hopefully did is just that simple trick of putting an ampersand before a command to Claude, which means don't run this here. Take this whole conversation so far, push it out onto the internet and run it in a remote cloud and then get back the answer.
- It's really amazing that you can do that. I guess you don't get back the answer. It runs remotely and then you probably saw you could do slash tasks to come and look at them.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And these sparklines is like a text based graph of the movement of these stock tickets and Yeah, come on. This is fantastic This again, this is all like zero shot stuff as they say Which means this isn't based on it not working and then me giving feedback and then it working This is just the demo that that I asked for just working first time pushed pushed to GitHub, just like that. So I absolutely love it. So I present this to you and hopefully you'll be able to get similar kinds of things by asking for a demo just like this.
