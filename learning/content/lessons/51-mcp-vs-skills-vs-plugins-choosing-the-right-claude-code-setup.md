# MCP vs Skills vs Plugins Choosing the Right Claude Code Setup

> Week 2 · Day 3

## Overview

And as it says here, we can hit Enter to go in and read the description. This is an agent that simplifies and refines code for clarity, consistency and maintainability, while preserving functionality.

Okay, that's pretty nice, let's go back. So this is all great, I think I like all of these.

It says, "I to install", let's press "I". Off it goes, "Install four plugins, restart called code to load new plugins.

## You will learn

- Understand the main ideas covered in **MCP vs Skills vs Plugins Choosing the Right Claude Code Setup**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Okay, let's do that. Control C twice, launch cloud again. And now apparently we have cloud with multiple plugins.

Let's have a look. Okay, let's do slash contacts and see what we have. Well, we have MCP for context seven.

That's great. We have a plugin called code simplifier. We have then got some plugins down here front end design and code review.

That is that is exciting. Okay, it's time for us to put put one of them to the test. Okay, we're going to try and run our code simplifier to simplify everything and you can directly call it precisely, as I said, but we could also just try just using natural language.

Let's say, please use the code simplifier agent to simplify the entire code base. Let's see what happens. Let's see what goes on.

what goes on. There we go. So the real name is code simplify colon code simplifier and it figured it out I think I think there we go it's appears to be navigating its way around running this properly let's see if it can if it gets sorted out or if we have to be more precise.

Yeah, no, it's running for sure. It's happening. This is Code Simplifier, Code Simplifier.

So we successfully kicked off the agent just by saying, please use the Code Simplifier. It figured out the right one to use. It's now running.

It's going through right now and simplifying everything based on the plugin that we installed. And so I imagine this will take a minute. I will come back when it's finished and we'll see whether or not the application still works.

Okay, so it went for, as it says, but six minutes or so, chugging away, it made a ton of changes. It mentioned everything that it did and it says that it's also run the tests. And it's kind of cool that we're using anthropics own internal code simplification tool that's been written and trusted by the maestros.

So let's see if it actually comes up, if it works. Well, here we go. I press the plus button, I'm starting a new terminal, I'm going to do scripts slash start Mac.

Let's see if it comes up, it builds, it's opened at least. Let's see if we can actually bring it up now. Okay, so I'm going to bring up a browser.

Going to go to localhost 8000. Here we go. Welcome back.

Sign in. We will have to create an account. It's our first time coming in.

### Deep dive

We will make one. We'll call it Ralph again since Ralph Loops did make this. Loops, two exclamation marks, loops, two exclamation marks.

Let's see if it works. Drum roll please. Yes, we're into a camban.

It seems to be working. There's boards, there's all of this stuff. We can add a card.

This is pretty neat. In both senses. There we over it goes very nice hi there Let's see if our AI assistant is there drum roll yes hello How can I help you with your cam and board today?

Success our code base has been simplified courtesy of uh, atthropics own work with their agent that has their best, their best abilities to simplify code bases. And of course, we don't even yet know how to install agents ourselves. We haven't got there on the course, but we know how to use plugins and plugins can do it can install commands, it can install mcp servers, it can install skills and things like hooks and agents that we haven't even covered yet.

And that's what it did in this case. And it worked great. Okay, what a journey it's been.

That wraps up plugins and that wraps up our look at those three different techniques. And what were they again? The three techniques.

MCP, let's stitch up someone else's tools to our cloud code. Skills, a simpler way to take expertise written in markdown files along with entire scripts to run, like a sort of higher level tool, just a packaged up tool into a script that can all be put into a skill, simpler, higher level. And then plugins are convenient way to bundle together things that can include MCP servers and skills, along with other stuff like agents and commands, put that all into a plugin and make it more discoverable through the official marketplace.

That is a plugin and that's what we did last. And all of these have pros and cons, as you are now so familiar. The MCP, it's a huge ecosystem, so much to choose from.

They're very flexible and the marketplace is like, glamour is getting more mature. There's certainly like good rating system and so on. But the cons is that it's certainly used up a lot of context, although it's better now, but it's still not great and it's complex to set it up.

It's very granular. Skills, efficient with the context, simple to set up, you get good results from skills. People are really loving it.

Negative is that it's quite limited in terms of the flexibility and it still feels a bit immature. Things like the evolving marketplace situation. Plugins, of course, something of the best of both in that you can have the right balance of both of these.

They're very simplest to set up. It's just you just install it all and you can be very explicit about what you run. We weren't explicit just then when we did our code simplification, but you can be.

As we were when we did Ralph Loops, remember there was just like a command to kick off the Ralph loop. The negatives is that right now, it's only include code, and it's better not to overuse these 'cause you can complicate your situation by having lots and lots of these kinds of plugins. And you know, this gives you the the the lay of the land and you may be thinking, okay, so with this in mind, thinking back to Andrei Carpathi's tweet about all these different options, how do you navigate which one you actually use yourself?

### Putting it together

And what I would say is quite simple, I would say this is the answer. Start with plugins. If there's a that you like, that you need.

That's what you should use. That's the simplest way. Start with plugins.

There are specific circumstances when you might use MCP and you might use skills. You might use MCP if there's something very specialized that you want to do like reading market data and you want to equip the market data MCP server directly. You can often do it through plugins as well because it would just be a wrapper around the MCP server.

But there are probably, I imagine the polygon massive one is only available by going directly to it. And so that's how you would do it. And I think when we do GitHub, we'll probably just install the MCP server.

So there are very specific specialized sets of tools that you would want to just use the MCP server 'cause you know how and you want that kind of flexibility. And then skills, it's similar. There's particular skill that you want that kind of flexibility.

And then skills, it's similar. If there's particular skill that you want to use, like the one from Vassal, for having an agent browser, a great skill, then you can install it from Vassal's site. There are reasons like that.

And the other time to use skills, of course, as I say, is if you want to share around your team and your organization, it's so easy just to check in these skills packages into your repo and then have it be available to everyone. But generally speaking, even when you're using skills, the simplest way to do it is just by using a plugin that contains those skills. That's the place to start.

That's how you can tweet back at Andre and tell him that. And on that note, that's enough for today. That's enough.

That is mcp skills and plugins. If it felt like it was a lot to digest don't worry. We're going to do more.

We're going to use them tomorrow and we're going to use them at the end of the week as well. And then into next week we're going to be building on top of it as we get into agents and things. So there's going to be tons more on this, but we covered so much ground.

Thank you so much for hanging on in there till the end of today. I know it was a long day. Tomorrow's going to be great fun as we look to apply some of these things into to really talk about the best way to have a workflow around the way that you work on projects.

But take a moment to celebrate in the fact that you have passed the 50% point.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Okay, let's do that. Control C twice, launch cloud again. And now apparently we have cloud with multiple plugins.

## Practical tips

- Success our code base has been simplified courtesy of uh, atthropics own work with their agent that has their best, their best abilities to simplify code bases. And of course, we don't even yet know how to install agents ourselves. We haven't got there on the course, but we know how to use plugins and plugins can do it can install commands, it can install mcp servers, it can install skills and things like hooks and agents that we haven't even covered yet.
- Negative is that it's quite limited in terms of the flexibility and it still feels a bit immature. Things like the evolving marketplace situation. Plugins, of course, something of the best of both in that you can have the right balance of both of these.
- As we were when we did Ralph Loops, remember there was just like a command to kick off the Ralph loop. The negatives is that right now, it's only include code, and it's better not to overuse these 'cause you can complicate your situation by having lots and lots of these kinds of plugins. And you know, this gives you the the the lay of the land and you may be thinking, okay, so with this in mind, thinking back to Andrei Carpathi's tweet about all these different options, how do you navigate which one you actually use yourself?
- That is mcp skills and plugins. If it felt like it was a lot to digest don't worry. We're going to do more.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

This today, as I say, a day of inflection. And you're through that. And you are already so much more of a pro than you were just yesterday and it'll be even more tomorrow. I'll see you then.
