# The Rise of Claude Code History, Setup & Installation in VS Code

> Week 2 · Day 1

## Overview

And so, let me tell you about the phenomenon that is Claude Code. It all started in late 2024 when Boris Churney, an engineer at Anthropic, did a side project that originally called Claude's CLI just to sort of drive coding with Claude in an agent loop, and it kind of took off from there.

Anthropic released it generally in April. I think it was available to most people in February of 25.

And it was considered, it was the first time that one of these CLI tools came out there and really took hold. There are so many of these now, but Cloud Code was where it began in April 2025.

## You will learn

- Understand the main ideas covered in **The Rise of Claude Code History, Setup & Installation in VS Code**
- Follow the practical walkthrough from Week 2, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And in September 2025, I mean, obviously during 2025, it then took off massively. September brought V2, which brought this whole robust ecosystem. Many of these features have been rolled out over the course of the preceding months, but they sort of matured in V2.

It was check pointing, sub-agents, hooks, skills, background tasks. There's also a Claude Code SDK that lets you write code to use the kind of Claude Code ecosystem. It's not the same as one of the agent frameworks like OpenAI agents SDK, which is just for building your own agents.

The Cloud Code SDK is for working within the Cloud Code ecosystem. Now, at this time, the best model on the planet from Anthropic was Claude Sonnet 4.5, which is one of the best models in the world, but it was certainly up there in the top few and it was going... it was great, but there were certainly rough edges.

And in November, anthropic released Opus 4.5, their strongest model. And many people see this as an inflection point in agentic coding generally. Opus 4.5 changed the game.

And coming after that, Gemini 3 Pro, Google's-top model, seen as in the similar camp and codecs 5.2, GPT 5.2 codecs from OpenAI that we've been working with, is also at that tier. But Opus was the first one, Opus 4.5, the first one that had people sitting back and saying, "Something has changed. We've reached a point where suddenly LLM coding agents are so much more reliable that we can really trust them to do a lot of code and not be having to check all the diffs.

And that's a big deal. And about the same point, anthropic passed a billion dollars of run rate revenue with claud code, which was quite a milestone. And then as of January, anthropic released co-work, which is like taking Claude Code beyond coding, the same idea, but now for other things.

And of course, we won't be covering that in this course because we're all about coding. But for sure, you can look at it. And at the moment, there's a lot of hype around something called open claw, which is like a sort of open source version of it also to be used just generally for for co-working in your life.

So lots of other related stuff. And Thropic also investing heavily in labs, which is also looking at more groundbreaking ways to use Cloud Code. So tons and tons going on.

There's probably been lots of great big things happening super recently after I record this video. And I'll try and put things in the resources. But I do urge you as well to not get too caught up in the hype.

The things that are really powerful and compelling are the things that tend to live for a few months. And if you get caught up in all of the excitement of the week, it can feel overwhelming. Claude Coder has been around for enough time for us to know it's here to stay.

It's really powerful. And a big part of this journey as well has been the journey of MCP, which is somewhat aligned with this. It kind of came out in late 2024.

It took hold. It's it's now got 100 million downloads a month. It's just huge.

And of course, mcp is a big part of the cloud code ecosystem as well that we will be covering. Okay, the time has come for us to install cloud code and find out what all the fuss is about. Now I will say that claw code, of course, that the clawed platform comes with a subscription price.

It's another of these $20 a month's. And it's optional for you. You can not pay anything and later today, I will show you how to work with three models or very cheap models through clawed code.

But it's not what I recommend. The experience will not be as good as for people that are willing to pay. And I think if there's anything that you want to invest in for this course, I would suggest that an anthropic subscription might be the thing.

### Deep dive

Remember again how much cheaper it is than buying a laptop or something like that, and you're getting so much power and capability. But it's a personal choice. You should only do it if you're happy with it.

And there are plenty of other ways to do it without paying a penny. So you should choose, you go with start free and choose whether or not to use a paid model later if you wish. But let's go and get everything set up right now.

Okay, so I've gone to a browser and I've gone to Claude.ai. Claude.ai. Here it is.

This is the front door to talk to Anthrobix Claude. And as with many of these ais, there are two different ways to think about pricing, two different products. There is the API for making repeated calls for building your own products.

That's what we use with OpenRutre last week. And there's also the consumer subscription product for a user. And in this context, we are being a user.

So that is the kind of plan that we're thinking about. And there's a pricing menu here that will tell you more about those pricing plans. There is a free tier for just chatting with Claude like Chat GPT.

We're not going to be using that. There is a pro tier which is $20 a month at Bill Monthly or local equivalent and this allows you to access Claude code on the web and in your terminal which is what we're going to do. And there is also a max which has $100 a month and a $200 a month plan.

And I'll have you know, I am spending the $200 a month plan because I'm crazy. But I use it all the time. I use it all the time.

And I have no doubt whatsoever that I'm getting value from that $200 a month, that unbelievable value. So I'm not obviously a salesperson for a PROPIC, but I can tell you I am a happy customer. Occasionally a very angry customer with with the Claude, but most of the time very happy customer.

Okay, so I would certainly suggest that you consider this, as I say, you don't need to. I will give you three alternatives later, but for now I'm going to assume that you either already have or you are now signing up to have a pro subscription. When you do that, you would press try "Claud." It would take you through to its screens, and you would then sign in with your Google credentials with email and go through the usual sign up process to have a "Claud" account, then it's time to install "Claud Code." So now you go to code.claud.com, and that redirects you to the "Claud Code" website.

Here it is, and cloud code is installing a computer is really very simple. It's just using this one line of code that will appear here that it will generate the right line of code for your system. But or as it says if you want if you want the proper documentation you click here and this has the details.

It knows that I'm on a Mac so it's showing me this first and foremost. this is the command for Windows. You copy it to your clipboard like here, or there's another Windows approach as well, and then you can paste that.

As we will in just a second, we're gonna take it over. We're gonna use the terminal in VS Code, why not? And we're gonna use that to install Cloud Code.

So I'm gonna copy the Mac OS one right now, and now I'm going to open up VS Code and see you there. So here we are in VS Code. If you've got other windows open here, like various agent chats, then close them down.

You're gonna file new window if you're not seeing something a bit like this. And now I'm going to bring up a terminal, which remember it's Control and Backtick. I think it's also Control and J on a PC in Command J on a Mac.

### Putting it together

Yes it is. Command J on a Mac, Control J on a PC brings up the terminal or Control and the back tick thing there, or just a view terminal. Oh yeah, and then paste.

I'm gonna paste in the command that I copied from elsewhere, from Claude's page. And I press enter and it's now gonna install Claude code on my computer. Well, it thinks that one through.

If you're on a PC and you get a bunch of permissions errors but you're not authorized to run scripts, simply Google that or ask chat GPT, a bunch of permissions errors, but you're not authorized to run scripts. Simply Google that or ask chat GPT, it will tell you about the absolutely standard instructions you need to run on your PC so that you have permissions to run scripts like this. Very ordinary thing to do.

Okay, Iranet set it up. It's successfully installed. I'm on version 2.1.29.

You may well be on a much more recent version than that. And let me know if there's anything new that you want to have be shown here. At the very least I will add it to the course resources.

So make sure that there's lots of good information about tips and tricks from recent versions. But the course stuff should all be here. Everything we're gonna cover, we are ready to use Cloud Code.

We are also gonna do something extra, which is install the Cloud Code extension for VS code. And I'm going to explain this and navigate it in just a second. But first up, please open the extensions window, which is view extensions or it's control shift X on a PC, command shift X on a Mac.

And you can see our Claude code is already installed for me, but if you search for Claude code, it should come up as the top extension, Claude code for VS Code. It's from anthropic tick means it's verified. I have almost four million downloads.

You probably have more and you would want to press the install button to install this extension so that you have the Cloud Code extension for VS Code. And now, this is a little bit confusing, but let me just explain that when you're now in VS Code using Cloud Code, there are two different ways that you can do things. One of those ways is going to be to use the extension, the Cloud Code extension.

And you do that by pressing the little "Cloud" button that's appeared up here. You see that right next to the "Code X" button that we had before. There's two of these side bars.

You press that and you get this thing appearing. And it's like one of these side bars, let me get rid of the terminal here, this is Claude Code appearing here in a sidebar but there's a different way to do it which is not to use this sidebar but rather to be in a terminal and to run it from within the terminal in VS Code and that is what we are going to be doing this week and you may may wonder why. They're very similar, very similar experiences.

The one that is using the sidebar over here is more baked into the platform, into VS Code. It's more built in, it's a bit more like using something like the codecs sidebar as well. It's more of an agent chat and so it's more sort of it controls VS Code a bit better.

And so in some ways that's better. But it's a slightly more constrained version of the product. You don't have all the pro features.

It's a little bit more packaged for more of a novice user. And we're not novice users anymore. This is what we would have used last week in week one, when we like sidebars and agent chats like that.

But we're pros now. We're going to be vibe engineers by the end of this week.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And in September 2025, I mean, obviously during 2025, it then took off massively. September brought V2, which brought this whole robust ecosystem. Many of these features have been rolled out over the course of the preceding months, but they sort of matured in V2.

## Practical tips

- The Cloud Code SDK is for working within the Cloud Code ecosystem. Now, at this time, the best model on the planet from Anthropic was Claude Sonnet 4.5, which is one of the best models in the world, but it was certainly up there in the top few and it was going... it was great, but there were certainly rough edges.
- Remember again how much cheaper it is than buying a laptop or something like that, and you're getting so much power and capability. But it's a personal choice. You should only do it if you're happy with it.
- Okay, so I would certainly suggest that you consider this, as I say, you don't need to. I will give you three alternatives later, but for now I'm going to assume that you either already have or you are now signing up to have a pro subscription. When you do that, you would press try "Claud." It would take you through to its screens, and you would then sign in with your Google credentials with email and go through the usual sign up process to have a "Claud" account, then it's time to install "Claud Code." So now you go to code.claud.com, and that redirects you to the "Claud Code" website.
- You're gonna file new window if you're not seeing something a bit like this. And now I'm going to bring up a terminal, which remember it's Control and Backtick. I think it's also Control and J on a PC in Command J on a Mac.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So we want to work directly in the terminal. It's convenient to use this terminal here, because then we'll have the file explorer, we'll have the other VS Code tooling around us, and it's aware that it's being used in VS Code, so it still has some control over the other panes. But that way we get to use the full featured Cloud Code. So again, a bit confusing, you can use it as the Terminal CLI app within the VS Code Terminal, or in the sidebar sidebar we're going to be doing the terminal.
