var e=`# Claude Code Sandboxing and Cloud Execution Deep Dive

> Week 3 · Day 2

## Overview

Yesterday was a packed day when we covered tons of material. Today we've got a fair amount, not as much, but it's really juicy stuff.

I can't wait. It's another yellow day.

It's another day of digging into Claude Code. It's going to be really interesting.

## You will learn

- Understand the main ideas covered in **Claude Code Sandboxing and Cloud Execution Deep Dive**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We're talking about the area of sandboxing, which is very, very critical. But as part of that, we're going to be talking about cloud execution, which is really fun. So, without further ado, let's get into it starting with a quick recap.

So look, yesterday we covered a ton of the pro features in cloud code and there's a few things you might have had as a reaction to this. One of them is a sense of being a bit overwhelmed by this. It's so many choices, a bit similar to Andra's original tweets.

And I'm here to tell you to not worry about it. So looking at this list, first of all, slash commands really replaced by skills almost always now. Multi agents and sub agents, the thing we're going to be focusing on is sub agents and then we're going to go into teams and things and we'll be doing that later in the week.

So just hold that thought. We'll do a lot more of it hooks. I mean, they're not used often.

They use when you have a specific problem to solve. And now you know how and you can always look it up and creating a plugin That's also you know how to do it It might well be handy to build some plugins to share with your teams But most of the time you'll be building skills or maybe subagents and using them yourself or sharing them in your repo For the rest of your teammates And that's that's where your focus will be and you already understand that and the good news is that your other potential objection might be This is so Claude Code Focus, and many of you hopefully are also Claude Code, nuts like me, but some of you might prefer Codex, some of you might be using Open Code or AMP and preferring to use one of these more open source platforms. But particularly skills is ubiquitous.

Everyone now uses skills, and many of these other things have also taken off in a big way. I think plugins is still as of now just a cloud code thing, but skills for sure is used everywhere. And so these are super common.

They've become the de facto standard created by anthropic. So what we're learning here is applicable generally. And if it's not already applicable to your platform of choice, it will be probably quite soon.

And as a quick point of revision, you'll remember that when you're creating a plugin, you create a folder for your plugin. And within that, you'll remember that when you're creating a plugin, you create a folder for your plugin. And within that, you have your commands that you want to add, your skills, your agents, if you have subagents, they're in a folder called agents, and your hooks should you wish to use hooks.

### Deep dive

There are a couple of other files that you can include in there as well that I didn't mention. And I think I alluded to the fact that I probably mentioned them now. And one of them is called dot mcp dot JSON.

And it's a JSON file that describes any mcp servers that are included inside this, this plugin. And so that's where you would put them. And there's another one called dot lsp dot JSON.

And that's something special. And lsp is something called a language server protocol, which is something which is able to describe to Claude code, the rules of a programming language, such that it can validate that some code you've written is going to work. And Claude Code is already, it already knows about the common programming languages, but if you were to work with a new programming language that Claude Code isn't already aware of, then you would want to configure that as one of these files.

You would put it in a.lsp.json, and you would put it in that plug-sp.json and you would put it in that plugin folder in order for that language to be supported by that plugin. And so that's a sort of pro feature that you may not know about, but that's how it works and that's why plugins can come with the support for additional programming languages. And you may be thinking that's a very obscure feature for me to be throwing in the mix.

It's pretty unlikely that most people here are going to be wanting to use clock co for a different programming language. The reason I mention it is because it was actually referred to in Andre's tweet and I want to get to the point at the end when you see Andre's tweet again and you're like, "Yeah, I know all of this." So I did just want to take a moment to mention that's where it comes from. It's unlikely that that's something that you would necessarily care about.

But if you do, you know, I know about it, and you can just look at the documentation on the plugins to see exactly how to add that in there, along with the MCP servers, along with the main four things that we just spoke about. That's how you build a plugin. And so now you really understand how to configure Cloud Code with these features, but the best way to understand it is to actually go and try it out.

Just go through the discipline of creating your own slash command, creating a sub-agent like I did, doing a hook, making a hook just to do something useful for you, and then even create a plugin the way I did, just to have gone through the exercise. So you know it and understand it and you see where the docs are in case you want to look up a special hook that's going to fix a particular problem for you. And then you've got that learning, you've got that expertise, and we'll put a bit of it to use later in the week.

And I'm going to throw up this page again with the pros and cons of subagents, but I think you get it. You get a sense of when it's right to call a subagent. One thing this page doesn't talk to is the difference between when you might use a subagent versus using the kind of agent teams.

### Putting it together

But we will get to that later in the week. But there's this clear sense that you can sort of delegate off to a subagent. And out of all of these reasons, the primary reason that you do it is because you want to free up the context.

And that also is the reason why you have some of the drawbacks as well. They are somewhat related. Anyways, these are the pros and cons of using subagents.

And that is a wrap on the topics, the the recap of yesterday. We're moving on to today to the very juicy topic of sandboxing. Now your first instinct might be to think Ed that sandboxing doesn't sound like a very juicy topic.

It sounds like a sort of security related, interesting, important, but not necessarily super exciting, but you're wrong. You were wrong. I will show you that this is going to be one of the most exciting topics We've had so far because there are two related concepts One concept is indeed the concept of sandboxing itself Which is this idea that you can sort of ring-fence your resources in some way so that they are more secure for example saying All right, I'm gonna allow Claude to change any files read read them, write them, do it's worse, do whatever it wants, but it needs to be within this particular sub-directory.

It can't reach outside the repo that's not permitted. And it can use the network as much as it wants, as long as it only goes through one of these 10 websites. That kind of thing adds extra security to the Bix.

And obviously what comes with that is it allows you to be more productive because you could just have a kind of yolo level of productivity without needing to to take too much of a risk. So it makes you more willing to be yolo. I think I mentioned it last week when we were yolowing that you might want to wait until we've got sandboxing in place before you do it perhaps.

And then the third thing is like a mix of both secure and productive which is which is saying that the approval process that you have in an unsanboxed world where you say you press the number two to approve something or the number one if you want to do it step by step, it's all very well but there's always a risk of what they call approval fatigue when you get so used to pressing the number one that you're just sitting there going one, one, one, one, and you're not actually reading it and so it's basically yoloing but you're giving yourself a full sense of security.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We're talking about the area of sandboxing, which is very, very critical. But as part of that, we're going to be talking about cloud execution, which is really fun. So, without further ado, let's get into it starting with a quick recap.

## Practical tips

- And I'm here to tell you to not worry about it. So looking at this list, first of all, slash commands really replaced by skills almost always now. Multi agents and sub agents, the thing we're going to be focusing on is sub agents and then we're going to go into teams and things and we'll be doing that later in the week.
- They use when you have a specific problem to solve. And now you know how and you can always look it up and creating a plugin That's also you know how to do it It might well be handy to build some plugins to share with your teams But most of the time you'll be building skills or maybe subagents and using them yourself or sharing them in your repo For the rest of your teammates And that's that's where your focus will be and you already understand that and the good news is that your other potential objection might be This is so Claude Code Focus, and many of you hopefully are also Claude Code, nuts like me, but some of you might prefer Codex, some of you might be using Open Code or AMP and preferring to use one of these more open source platforms. But particularly skills is ubiquitous.
- And as a quick point of revision, you'll remember that when you're creating a plugin, you create a folder for your plugin. And within that, you'll remember that when you're creating a plugin, you create a folder for your plugin. And within that, you have your commands that you want to add, your skills, your agents, if you have subagents, they're in a folder called agents, and your hooks should you wish to use hooks.
- But if you do, you know, I know about it, and you can just look at the documentation on the plugins to see exactly how to add that in there, along with the MCP servers, along with the main four things that we just spoke about. That's how you build a plugin. And so now you really understand how to configure Cloud Code with these features, but the best way to understand it is to actually go and try it out.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And so from that point of view, the unsanboxed approach may not be as safe as you think it is because your brain gets tuned to just hitting one or two all the time. So that's probably what your new sandboxing was. This kind of ring fencing thing, that was clear to you and you're thinking, so what's the juicy part? The juicy part is this blue box that I'm about to talk about now in the next video.
`;export{e as default};