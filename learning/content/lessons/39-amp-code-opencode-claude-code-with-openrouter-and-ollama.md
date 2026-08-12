# AMP Code, OpenCode & Claude Code with OpenRouter and Ollama

> Week 2 · Day 1

## Overview

And then there's AMP. AMP is somewhat like open code in that it's not affiliated with any provider.

The idea is that it's an agentic coder that you can run that can attach to multiple providers and run different bits of analysis. It comes in a terminal variance, which is how it's most famous.

And then also as extensions to any of VS Code Cursor or WinCERF, which as we all know are really all the same thing anyway. And this, otherwise it has, it's well known, it has something called AMP-free and AMP-free, which, which first time you look at this, it's a bit confusing.

## You will learn

- Understand the main ideas covered in **AMP Code, OpenCode & Claude Code with OpenRouter and Ollama**
- Follow the practical walkthrough from Week 2, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It seems to suggest that AMP-free is actually at $10 per day, which doesn't have free at all. But that's not what it's saying. It's saying that you get kind of $10 of credit a day in this plan in response for in return for looking at ads and the tech community loves loves to get really up in arms about ads.

The pitch folks come out. But I think this is a great deal. I think as if the ads are being served and there are things which which maybe even are not unuseful, then fair enough it sounds like that's a good good way to earn $10 a day.

Anyways so that is something that is available for you. Should you wish? Let's just take a look back here.

I'm going to copy that into a clipboard. Let's go and give AMP a try. Well, here I am back in VS Code in the same PM project.

I just put control C to open code. And I'm now just going to paste in that command to install AMP code. Why not?

Let's do it right here. And apparently it's done. it believes that it has been installed we'll see all right and after installing you type the word amp to launch it the first time you come in it's going to tell you that you need to log in you you say yes you do why it will launch a browser window it will ask you to log into amp you don't have an account yet so you'll say sign up it will ask for you to give an email a password or use a Google or flow, which is what I just did.

Went through that flow, came straight back here, and it just works. So you're now in to AMP. First thing to notice is the ads.

You're getting an ad served up here, which is how you are paying for your $10 free model usage every day. Secondly, what's kind of curious is that you don't get to choose a different model. AMP likes to pick the model for you behind the scenes.

It's trying to serve up the best it can given the task at hand and you just kind of trust it and go with the flow. And it's also worth knowing that the control S is a way to toggle the different modes you're in. You see on the right here, it says smart.

I'm in the smart mode. I do control S and it goes to deep and then rush. Smart is the sort of like standard.

Deep is slower thinking and rush is faster quicker. So I'm going to have it on deep. I would rather take the time to get it right.

I'm going to delete this code review one more time. I feel kind of bad deleting GLM's code review there. And I'm going to say, please review everything These review everything in this project.

Carry out a code review and write your conclusions to a file code review in the docs directory. And off it goes. And of course, you're now familiar with the CILI experience, you're used to seeing the sort of think going on, these kinds of status things, as stuff happens, as AMP works on it.

And we can see this is the context usage. It's got 5% of the 272K, and that it's, we've spent 4 cents of our free plan. This is the free $10 that we've got, and it's giving us a sense of the time as well, and we're in deep mode.

So all of this is happening. This is how you use AMP. Get a sense for this as well.

I'll see you when the review is complete. Okay, well, it wrote a nice code review, and I realized that I'd accidentally just said code review, not code review.md. So I had to prompt it to fix that to be a code review markdown file.

Now it's done that, and we can see what it's found. It's found something critical. Oh yeah, okay, the authentication thing again.

That's fair enough, that's a good catch. Credentials are hard coded, yup, this is all real stuff. It's found some real problems.

It's offering to fix them. It could certainly do that for us. We can see from the fact that it's got some, oh, I click on that and it gives me the context window details here.

We can see from this that even though it doesn't want us particularly to have full visibility into the model it's using, it's probably using one of the OpenAI models that has that context length and it feels like it's a high-end model to me. And we know that we have effectively spent 42 cents of our free $10 allotment by virtue of watching these adverts right here. So that gives you a good sense of what you can do here.

### Deep dive

You can keep going. And again, you've got an experience, which is sort of cross provider, but is otherwise quite similar to Cloud Code. Although from my experience, Cloud Code has the edge.

And there's a final thing to show you for AMP Code. If I go now to their website at AMPcode.com, I am now logged in because I've gone through that credentials process. If I come up here to my avatar menu, I can go to settings and here you'll see that I'm on the AMP free plan.

I have $9.58 remaining in my 10-day allotment, 10-day, $10 allotment. I don't know if you'll have the same allotment, but hopefully you do. And there is also the way here that you can purchase credits should you wish to be spending more and you can have like an automatic Top-up situation as well and I can connect through to my github credentials if I want so this This is all the way that you configure your amp code account, but but overall Amp gives you this very easy way to have access to models for free easy way to have access to models for free and even like like frontier model level performance with this $10 a day allotment in return for watching some some ads up at the top.

Okay that's amp code. We're gonna go back to Claude code now because we're gonna talk about hooking up Claude code to other providers. Okay so we're gonna run Claude code again I've gone I'm back in I'm in the PM project I've've stopped AMP, cleared the screen.

Before we do anything, we're going to set a few environment variables that's going to control anthropic and tell it, we don't want you to call anthropic models, we want you to call something different, open router to start with. And it's worth noting that this is not the way that anthropic likes you to run Cloud Code. Cloud Code is designed to run with Cloud and they have optimized the experience so that the tooling is best equipped to be working with anthropics models.

So we're going to have a janky experience doing this and even configuring it is a bit of a janky experience. So I've got separate commands for either a Mac or a PC. I'm going to do it on a Mac in the course resources you'll have both.

And unless you particularly want to experiment with this, I recommend you watch me but don't necessarily do this. For the open source stuff, you should use Open Code or AMP unless you really wanna be doing it this way. So the first command I'm gonna run is something on a Mac is going to load in my.env file and set that open router API key to be an actual environment variable that's set.

Okay, and now I'm gonna set a bunch of environment variables. I'm just gonna paste in a bunch of commands. Here they all are, I'll run them and tell you, I'm just setting a bunch of environment variables.

I'm just going to paste in a bunch of commands. Here they all are. I'll run them and tell you I'm just setting a bunch of environment variables.

I think on a PC I'll have the list of instructions and I think you have to run them one by one. Sorry about that. I'm setting a bunch of environment variables and throw pick default haiku model.

I'm setting it to be the moonshot AI Kimi K2. I got this from open router. That is of course the Kimi K2 model we looked at.

We saw before I't, I think we used GLM, Kimi K2 is another great open source model from Chinese Air startup Moonshot AI and it's perhaps the strongest of the open source models right now. I'm also setting anthropic default sonic model and default opus model to also be this, if you don't do that, then it ends up flipping to using Claude's models anyway. models anyway.

Then I'm setting something called anthropic base URL to be openrooter.ai/api. And which means that this is saying, when anthropic, when you are contacting Claude in the cloud, instead of using the normal URL you use, I wanted to use this one instead. And sneakily, we're using openrooter instead.

It's not that sneaky. Anthropic knows we could do this. It's put this feature in for a purpose.

But you know, that's the idea. We're saying don't actually talk to Claude, talk to open router instead. And for the anthrobic auth token, I'd like you to use open router key, my open router key.

And I'm going to blank out Anthrobic's key. It looks like I might be missing the exports. I think this will work fine for me, but I'll have the exactly the right commands in the course resources.

All right, and once we've done all of that, we can now launch Cloud Code to use KIMI-K2. And here is the command is instead of just Claude, we're doing Claude dash, dash model. And then I'm using the name of the model, which I've taken from open router.

I run this. Claude code comes up. If I do slash model to look at the model situation, you can see that we have moonshot AI KIMI-K2 as our model.

And it thinks it also has access to these other models too. What it doesn't know is that we've set them all to be KimiK2. And so we're using KimiK2 across the board here.

And let's let's ask you a question. And we'll keep it to a fairly simple one. How about describe the purpose of this project.

### Putting it together

And we'll have that run and off it goes and it's thinking. And you can see it's of course the same Claude code tooling we're using. This sort of stuff wasn't coming from, God, this is part of the software.

And what's come back has been a description of what it's doing. Based on the project documentation structure, this is a project management web application with the following key features. And it's got some information in there which looks right.

And just in case you don't believe me, here is open router. This is my activity page, my avatar menu go to activity, up comes this and you'll see that the most recent calls are kimmyk2, where it passed, I know a whole bunch of stuff, and it got back just the tokens presumably of that summary. So that seems to work well, and that is how you direct it to using OpenRutor.

And if you're wondering why I didn't ask it to a code review, it's because I did that before, and it made a royal mess of it. So that was too much for Kimeke to, and it's probably just some sort of misunderstanding between the way that the tooling was set up. But you can try and see what you get.

But if you're going to use open source models like this, then the key is to be willing to experiment. You'll find some things will work, some things won't. Things are changing fast.

I know a lot of people like using Grock, some of the fast variants of Grock with a K, from Elon Musk. So worth trying that too. As long as you're willing to experiment, there's lots to be done here.

All right, last but not least, we're going to try Ollama running locally on my machine, and this might be a total mess. I don't know if my machine can handle it, we'll find out. Okay, here we go, wish me luck.

I've done Control C twice to get out of Cloud Code, clear the screen. Here we go. I'm going to start by copying and pasting in a set of commands on a PC.

You'll need to use different commands from the course resources one by one. We have set the default models to be GPT OSS. We're pointing instead of pointing to Claude up in the cloud or pointing to the my local host, my computer's just there.

I'm looking over there as if you know it's there, but it's right there. And it's running on port one one four three four, the default, that's where a llama is installed and running. If you're not familiar with this, then don't worry.

You need to have a big computer and I'll put instructions in the resources. And with that, I should be able to launch Claude by typing Claude, dash dash model, GPT-OSS. Let's find out what happened.

Here we go, I press enter. Up it comes, let's do slash models to find it, slash model. So I find out what's going on, GPT-4, GPT-OSS is number four.

It's the one that is selected. Okay, let's say say keep it very simple. Please summarize this project for me.

Okay, let's see what happens. I will give it a minute and it might take a minute. I'll see if my GPU starts to get hammered.

You're still there. You still see me? Okay, everything seems to be good.

There's no smoke yet. I will see you in a minute or maybe in an hour when this model finishes running locally. If you have a big powerful computer, then you might be finding things are running very fast.

You might also be able to rent a GPU in the cloud. But honestly, if you're going to use super powerful models, your best way to do it is through open router, where they can still be incredibly cheap. Well, while I've been blathering away and it does appear to be coming back with a response.

So we will see whether if I keep this, I keep this sentence going for long enough, yes, we'll get an answer. Here we go. This did, and I can see my GPU has been flat out, but this is a response.

A project management MVP, a local only web app that uses it's very good. That's very true. Hard coded password, it's recognized that, and it recognizes how to run it on my Mac, that is correct, and there we go.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It seems to suggest that AMP-free is actually at $10 per day, which doesn't have free at all. But that's not what it's saying. It's saying that you get kind of $10 of credit a day in this plan in response for in return for looking at ads and the tech community loves loves to get really up in arms about ads.

## Practical tips

- Let's do it right here. And apparently it's done. it believes that it has been installed we'll see all right and after installing you type the word amp to launch it the first time you come in it's going to tell you that you need to log in you you say yes you do why it will launch a browser window it will ask you to log into amp you don't have an account yet so you'll say sign up it will ask for you to give an email a password or use a Google or flow, which is what I just did.
- You're getting an ad served up here, which is how you are paying for your $10 free model usage every day. Secondly, what's kind of curious is that you don't get to choose a different model. AMP likes to pick the model for you behind the scenes.
- It's trying to serve up the best it can given the task at hand and you just kind of trust it and go with the flow. And it's also worth knowing that the control S is a way to toggle the different modes you're in. You see on the right here, it says smart.
- I have $9.58 remaining in my 10-day allotment, 10-day, $10 allotment. I don't know if you'll have the same allotment, but hopefully you do. And there is also the way here that you can purchase credits should you wish to be spending more and you can have like an automatic Top-up situation as well and I can connect through to my github credentials if I want so this This is all the way that you configure your amp code account, but but overall Amp gives you this very easy way to have access to models for free easy way to have access to models for free and even like like frontier model level performance with this $10 a day allotment in return for watching some some ads up at the top.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So that did work, that was indeed, I know for a fact it was using my local model, 'cause I saw my GPU going flat out, so that gives you a good example of how you can use Cloud Code on your computer, if you have a big enough, beefy enough computer, then you could be potentially productive using this. And with that, that's enough yellow, enough messing around with platforms, but today I showed you Claude code, I showed you Open code, I showed you AMP code, and then we went back to Claude code and used it with OpenRooter and Ollama instead, if you closed down those terminals and start a fresh terminal, your environment variables should be reset and we'll be back to Claude Code with Claude, which is a great place to be and is where we need to be for tomorrow as we dig all the way into Claude Code and become advanced users of it. And with that, wow, you're 40% of the way through this program to be an expert agent engineer. 40% of the way through, tomorrow's another yellow day, I'll see you then.
