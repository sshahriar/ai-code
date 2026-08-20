var e=`# Adding MCP Servers to Claude Code Context7 & Polygon IO

> Week 2 · Day 3

## Overview

And I'm back here at Glamour and I'm going to look for another MCP server. I'm going to look for one that's not really got anything to the coding.

We're just to show you the extent of the capabilities. I keep talking about market data.

Well, here's one. Here's one by Polygon.

## You will learn

- Understand the main ideas covered in **Adding MCP Servers to Claude Code Context7 & Polygon IO**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

They've actually changed their name to massive as a company. But I do believe that their MCP server here it is Polygon. I/O MCP server.

It's still it's still it's still comes under that name. It still comes under that name. And this is a way that you could give your Claude access to stock prices.

Now for this one to work, you have to get an API key, which is free if you don't mind having like stale market data. But the, you, you, I've got an API key and in my agent of course, we actually use it. So you might have one if you've taken that course.

So I am going to show you this too, but more for amusement of showing how you can give so many different kinds of skills. But it's not obviously not a great example for helping with coding. But if you're in the middle of coding and you want to know what your portfolio value is, then maybe it'll be useful.

So we'll look at that one too. Okay, and with this, let's now go to Claude Code and try equipping our cloud with some skills. So here I am in VS code.

I'm in the PM project. Again, we've come back to this one more time. I'm going to bring up a terminal.

You know it's control back tick. And I'm going to start cloud code, my typing, "Claud, we're in cloud code." I'm going to do slash context to bring up details of our context and show you that it's nice and clean and make this bigger, very empty. It does actually come with a few MCP tools and skills baked in and we'll talk about them another day.

But it's basically pretty empty. And now it's going to be our time. We're going to add in context seven.

And I'm going to come out of this and you do that at the command line, not within Claude, but out of Claude, at the command line. We're going to run a command that's going to bring in context seven. Now, here we go.

I'm just going to paste in the command that I just took from their GitHub. And it was also on Glamour. This is just the command that we have there.

You can see what it's doing. It's it's Claude. It's calling Claude mcp add.

It's saying I want to add in an mcp server. It's called context seven. And what comes after the double dash is how it will actually launch that mcp server behind the scenes.

It's written in JavaScript. So it's going to do an mpx command, which you may know runs like a node tool. And it's going to take it from up stash slash context 7 mcp.

That's what it's going to do. Now, if you look in the instructions, you'll see that it asks you to also put an API key at the end here. But that API key is optional.

If you want to have a better rate limits, you have to put an API key, we're not going to do that. We're just going to run this, and it's added it in. It's added in to local config, it says, so we have added in this mcp server.

And now we can just run Claude again. All right, we're into Claude. Let's do slash context and see what we see here.

So we can see now that there are two MCP tools here. In addition to you may recognize that those were there already, as I say, we'll talk about them another time. But there's two new ones.

### Deep dive

Now, it's possible that you won't see those ones in immediately because there's some recent optimizations that means that sometimes it sort of delays adding them in until it knows it needs them. So you may not and if you don't don't worry they're going to appear very soon. But you can see that mine are in there and I'm using up a little chunk.

I'm using up like like there's two tools and they're using up about a thousand tokens in total. One of the tools is called resolve library ID and one is called query docs. And the whole point of MCP is that these tools that we've equipped Claude with come with some English to describe how Claude should think about using them.

It's described, it tells Claude, hey, you should use this if you're given a description of a library to look up and find out what's the ID associated with that library. And then once you've got the ID, you can use this to query its docs. And that's why there are two tools.

And so what we should now be able to do is just ask Cloud Code a question that pertains to a particular library. And we should see whether or not it can use these tools to dig in. Now there's something to know about which is that if you just ask Claude, it can be a bit hit and miss whether or not it actually uses the MCP server.

And if you want to make sure that it's going to use the MCP server, you have to tell it quite specifically. You don't need to. You can sort of risk it and see if it figures it out.

It's got an English description of these. So it should just be able to make sensible choices. But if you know what you're doing, it's usually best to be direct in the prompt.

Let me show you. The key is to use the word use. You say use, contact seven, and the name of the MCP server.

And once you've said that, it knows that it's got to try and find that stuff in order to do what are you about to tell it. To summarize, for me, the open, the right way to use open AI agents SDK. Let's just with a model other than open AI's models.

Let's ask it that very specific question. We will see what it does. So first of all, it's saying it wants to resolve, it's saying a tool use.

Are you okay for it to proceed to use this tool? So you can see the good news is it's figured out, it needs to use this tool. It's figured out it needs to resolve a library.

That's amazing. We'll say yes. And again, I hope in your mind you're clear on what is amazing.

It's not amazing that these tools exist. It's great that someone's written these tools. What's amazing is that we've plugged them in so easily.

And now it wants to use this again. Let's see which... No, it's using query docs.

So it has found opening our agents Python, and it's now querying the docs. I'm gonna say yes, so it's using that second tool now. This is great It's doing just what we wanted.

It's thinking about that and Hopefully it's going to give us a summary and yes, I could see look at that it is indeed This is this is all the the exactly the right instructions It's something that people often trips people up and I can see here from looking at it quickly That it's doing it the right way. That's good to see. It took my word for it.

So yes, what you just saw is that because we said use context seven, it knew that it should, it gave it a hint that it should use those MCP servers, and then it used the two tools in the right way. It found the idea of the library I'm talking about, and then it looked up the documentation, got the latest documentation and Responded with exactly the steps to take that's pretty cool. All right, and now let's try one without saying use context 7 let's say how do I turn off telemetry with crew AI Let's see what happens and see if it tries to use the tool that we need to ask for permission because happens, let's see if it tries to use the tool, it would need to ask for permission because but it is, maybe because it's already gotten the conversation, it is going to do that.

So it just shows you don't need to do use if it's got the handle on things, but if you want to be sure then it is best to use that but it's great to see that in this case it wasn't necessary, it was smart enough and here we go, This looks like it's exactly the right instruction. So another nice example and actually showing that you probably don't need to say use context 7, but it's good to know that you can do. OK, what I'm going to do now is I'm going to come out of this.

### Putting it together

I'm going to Control-C twice. And then I'm going to run this command again to add another MCP server that I just taken from Glamour again. I'm going to do PACE.

And what you'll see here is I'm adding in the polygon I/O MCP server. Now you'll see what it says there is that it says massive API key equals your API key here. So I have to put in my API key and I'm going to do that off camera.

But so I'll do that right now and when I see you back I will put in that, I will have then restarted Claude so we can see whether or not Claude can tell me my share prices. Okay, here we go, Claude, back it comes. Let's do slash context to see what we've got in our context now.

(laughs) So there's a lot more now. There is a whole ton of these Mcp massive and then there's mcp context 7. You can see that the massive which is the new known for polygon I/O it has like tons of stuff for getting all sorts of things about share prices and a whole lot more futures and analysis and goodness gracious there's lots there.

So it only remains for me to find out share price. All right, let's do what's the current share price of Apple. And of course, again, you don't need to do this one.

This is only if you've got a key and you want to see this working, whatever. I do this just to show you again how easy it is to give power. And it's good to see that I didn't need to say use massive.

It's already going to try and do this. It's using the right tool, get snapshot ticker. And so I'm going to say yes, I'm going to let it use that tool.

It's contacting Polygon IO. It's running locally, but it is calling out to Polygon in the cloud or massive. And there we go.

Apparently it's currently trading at $270. I'm not going to double check. I'm guessing that it knows.

There you have it. We have just equipped Claude code with the skill to look up equity prices and research and tons and tons more, all through this massive MCPServer. And you can see that it is something of a massive MCPServer.

It's certainly something that's got lots of different tools. And the latest way that Claude Code works, it doesn't load all of them into context. It's quite efficient, but over time it would start to use things up.

Let's just do context again right now to look at the latest and you'll see, yeah, actually it's still being very efficient with usage, but we do have lots of tools there that we've added in. Yeah, so I'm being an idiot. You probably saw this.

Look, you can see very clearly these are the tools that are available, this long, long, long list. But actually, Cloud Code has only loaded this tool, 156 tokens. This is a reasonably new feature in the last few weeks for me that Cloud Code used to load all of these, but now it only loads the tool it needs.

And so that does me the MCP servers aren't as much context hogs as they once were because they are all dark race. You should be able to see that distinction between the available mcp tools and the loaded mcp tools. Okay, very nice.

That is mcp in action. There's just one more thing we have to do with these mcp servers. If I do here slash mcp enter, you'll see that we have context seven and massive, both there, both connected connected come out of that.

I'm going to quit out of Claude code. I'm going to type Claude MCP remove and then contact seven. So before it was Claude MCP add and then I'm going to do Claude MCP remove massive.

And now I'm going to launch Claude code again.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

They've actually changed their name to massive as a company. But I do believe that their MCP server here it is Polygon. I/O MCP server.

## Practical tips

- Now for this one to work, you have to get an API key, which is free if you don't mind having like stale market data. But the, you, you, I've got an API key and in my agent of course, we actually use it. So you might have one if you've taken that course.
- Now, it's possible that you won't see those ones in immediately because there's some recent optimizations that means that sometimes it sort of delays adding them in until it knows it needs them. So you may not and if you don't don't worry they're going to appear very soon. But you can see that mine are in there and I'm using up a little chunk.
- And if you want to make sure that it's going to use the MCP server, you have to tell it quite specifically. You don't need to. You can sort of risk it and see if it figures it out.
- It's got an English description of these. So it should just be able to make sensible choices. But if you know what you're doing, it's usually best to be direct in the prompt.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And now I'm going to do /mcp again. And we'll see there are no mcp service configured. So we have now removed those mcp servers. They've gone, OK, next is skills.
`;export{e as default};