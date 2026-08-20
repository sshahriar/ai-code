var e=`# Setting Up Claude Code Sandbox & GitHub Integration

> Week 3 · Day 2

## Overview

Okay, here I am back in VS Code, back in Claude Code. I've also, as it happens, I've uninstalled that plugin and deleted those files and pushed to git.

The only thing I've now got set up in my dot-clawed, everything is empty except the cerebras skill. I'm keeping that around because we will need that at some point.

Okay, so here we are in Inclo Code, and I'm gonna type /sandbox. There we go, sandbox disabled, it says.

## You will learn

- Understand the main ideas covered in **Setting Up Claude Code Sandbox & GitHub Integration**
- Follow the practical walkthrough from Week 3, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Sandbox, press enter to configure. Okay, so we're now going to set it up. Now, it is clever in that it knows what needs to be installed and it should guide you through the installation process.

If anything, if it doesn't give you all of the steps required, I will of course have links in the resources to what you need to do. And you can see that there's a few different options. The current thing is no sandbox.

The there's a sandbox number two would be to give me a sandbox, which allows a bash, which shell scripts to be run and regular permissions. But number one is like a sandbox version of YOLO commands will try to run in the sandbox automatically and attempts to run outside, fall back to regular permissions. Explicit, Aston I-Rules always respected.

So you can always add an I-Rul if you don't want it to do something and it has a link to the docs in there as well. So I'm gonna go with that. I'm just gonna show you on the overrides, you'd be able to set up overrides, but let me press one.

Let's go back there now to Sandbox and have a look at here. This is now the current setting. Overrides is where you can choose to have a fallback that would be then no longer in the Sandbox or have it be strict.

And then config is where you can set things that are allowed and denied. You can see a few things in there that look like they probably should be denied, which is just as well. The sandbox mode is now on and that should mean that we are in good shape to be running things with fewer need to approve permissions.

Okay, so I'm going to run something which is going to require it to a few things. I should probably point out the, I think what it can do within the sandbox is run bash scripts, shell scripts, and it can read and write files to its hearts content without asking me anything. Web searches will, it will still ask me, but once I've approved that, then it should be good to do it.

So it does, it does need to do that still. But I'm going to say please carry out comprehensive research and write three documents to the planning directory. And I'm asking it to research the market data API from massive, formerly polygon, write a document about that, research, how think about how we would like to build our interface, our market data interface, write a document about that, and finally research how we would do a market data simulator and write a document about that too.

So I'm setting all of that off. It's running now in our sandbox mode that means it should only be asking me for permissions to do web searches. Everything else that it might need to do should it should just be able to go off and do the task.

No need to ask me for anything. And we will see what happens. It's doing its thing.

It's garnishing. It's doing task. It's researching.

It's doing its thing, it's garnishing, it's doing task, it's researching, it's thinking, it's reading files. A lot going on without it needing to ask me for stuff. So I will see what's happening and now here we go.

Oh, it does one so icy, icy. So to use this plugin, this isn't something that I've given it permission for before and it's asking to use the context seven plugin that I quite forgot that I had. But of course that is a wonderful way that is much better than doing the research from a web search and that's using an agent.

So that's going off. And it's now using the other the query docs command. So we'll let it do that too.

### Deep dive

And those are all happening and it's now going to be creating this documentation and I will see you in a minute when all of this finishes. Okay, and that's done and there are the documents and it all looks pretty good. I haven't reviewed them because I'm not going to because we're going to now just just let this thing keep going.

We're going to be much more trusting this week. The couple of things to bear in mind, if you look through the documents, if you do want to use this strategy for sandboxing, it is worth reading the docs. It goes into more detail about how you can configure it in a more granular way, for example, to allow web searches to various places.

It also has some very important security concerns that you do need to keep in mind if you use this a lot and it's laid out very nicely in the docs. It also does mention I notice that support for native support for Windows not having to go through WSL is coming soon. So maybe by the time you see this it already supports Windows out of the box.

But that is the first type of sandboxing. This is the one that's built into cloud code super simple and very convenient just slash sandbox to get it running. Okay, and now, now we're going to progress to the remote cloud code on the web.

Okay, I'm really looking forward to this. The first step, there's a bit of a setup thing, just a little tiny bit of setup. The first step is to bring up a browser and go to claw.ai/code.

claw.ai/code. And it takes you over to this screen here, code with clawed anywhere. As you will see, run multiple coding tasks in the cloud seamlessly between your browser, terminal, or mobile.

Mobile. And the first thing you need to do, the reason we've come here is you need to connect clawed with your GitHub account. So you press connect to GitHub and it's now going to want to authorize Claude and it's going to hopefully connect my GitHub to Claude.

There we go. Something is happening. Connect your repos, install the Claude Code GitHub app in your repositories, connect them to Claude.

You can manage this later. So we might as well do it right now. So when you've manage this later so so we might as well do it right now so you when you've got this screen here you then press connect repositories this is going to bring up this and I'm going to go into installing cloud into repos and I guess what what I'll do now is I'll click on only selected repositories and I'm just going to pick this one for now and press install and authorize depending on your, you can do it to all repositories, or whatever you would like.

Okay, there's just a small little bit of extra setup. Still needs to be done. I'm going to go into Cloud again.

There's a command you need to run to set up something called the the the Cloud app in the GitHub repo. And when you do that, it's going to complain if you don't have a few things already installed on your machine. The way you do that is that you slash and then I start typing install.

You'll see that installed GitHub app is one of the commands. If I run it, it's going to complain that there's a few things not installed. The GitHub CLI being able to run the command gh and conveniently, it tells me exactly where I go to find out more about how to do that.

And it tells me the command to run on a Mac and the command to run on Windows and the command for Linux or where to go for Linux. So that's very convenient. I'm going to run this one because I'm on a Mac.

You're going to run that one. If you're on a Windows PC or if you're a Mac like me, you're going to run this. And then after that, I'm going to run g h auth login to login from this computer.

### Putting it together

So I'm gonna come out of Claude code, escape from that, and come on C. There we go, I'm out. I thought I'd stuck a Claude code for a minute.

And now I'm going to run that brew install command. I'm gonna come in and do that, and then after that, I'm gonna do the GH auth login, and then there we go it's happening already and once I've done that GH auth login which will take me on the github auth flow and then I'll come back in a second once I'm logged in and then we should be ready to go and it took me through some shenanigans where it launched a web browser as these things off to do and I had to log into github and meanwhile it printed a code in the PowerShell in this terminal and I had to type that code into the screen, and then we're all set. And now I am, or I'm logged in to the GitHub command line interface from my computer.

I should also mention, by the way, that I've done a git add dot and a git commit, so that if I do a git status, we can see that everything is up to date and done. All right, and now I'm going back into Claude again. Now look, we're almost done with the shenanigans, but there's just potentially a little bit more to be done.

And this depends a bit on how you've gone through the flow so far and also Claude and Thropic is changing this from time to time. So always look out for the course resources for the latest, but come back in. Now I've actually gone to a new blank project to see what it's like first time.

And one more time now that we've got everything installed I'm going to do this slash install GitHub app and I'm going to to set select this repository Which for you is going to be the the Finally repository and I'm coming in here Let me bring up this browser so you can see and we are now going to say that we want to install the GitHub app in this repo that you may have already done But you may get to see this screen and when you press that configure button you come through to here Which is a screen you might have seen from earlier, so this might not be necessary You might need to make sure that you select this repository I've just done that or you can choose all repositories and then press save and it takes you back into the the Claude screen and it takes you back into the the Claude screen. You then have to go back to Claude Code which is sitting here. It says press enter once you've installed the app and you press enter and look at what comes up here.

It says select the GitHub workflows to install. This is a key step. This is where you are installing a couple of workflows into your GitHub repo, which is going to control Claude.

And it's going to allow you to do things that have a GitHub issue, tag Claude, and Claude will take it over. If you see what I mean. And you will, once you made sure that these two are ticked, you can press the space bar to untick, the space bar to tick, now they're both ticked.

You hit enter and you can then say that you want to have a long-lived token that comes with your Claude subscription and then at that point you press enter one more time here. So here we go I'm going to press enter here and off we go back in here. Claude Cobra likes to connect your Claude Chatter count.

You press authorize and now that has been done and now you come back here one more time and it will automatically open up GitHub and what you're looking at here, and this takes a while to get your head around, you're looking at a pull request in the repo. For you, this will be in the repo we're working on, finally, but I've already done it. So I'm doing it again with something called Testflow, but it's created a pull request that is to add a GitHub workflow into your repo.

I will try and put some notes down on this or ask me in Udemy Q&A if you're confused. And you simply have to press the Create Pull request here to create. This is a pull request.

And then you need to press the Merge Pull request. And it says, Add Cloud Code GitHub Workflow. Confirm the merge.

That is done. And that might have seemed all quite mysterious to you. But what you've just done is you followed a process, which has added a special workflow into this GitHub repo, which is going to allow Cloud to access it.

You've really bridged Cloud with your GitHub repo. And ultimately, the effect of all of this is that if we're in the finally repo, looking at it here, you'll see that there is this folder dot GitHub slash workflows. And if I come into that, you'll see that there are some YAML files in here, Cloud Code review and Cloud dot YAML.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Sandbox, press enter to configure. Okay, so we're now going to set it up. Now, it is clever in that it knows what needs to be installed and it should guide you through the installation process.

## Practical tips

- The there's a sandbox number two would be to give me a sandbox, which allows a bash, which shell scripts to be run and regular permissions. But number one is like a sandbox version of YOLO commands will try to run in the sandbox automatically and attempts to run outside, fall back to regular permissions. Explicit, Aston I-Rules always respected.
- So you can always add an I-Rul if you don't want it to do something and it has a link to the docs in there as well. So I'm gonna go with that. I'm just gonna show you on the overrides, you'd be able to set up overrides, but let me press one.
- It also has some very important security concerns that you do need to keep in mind if you use this a lot and it's laid out very nicely in the docs. It also does mention I notice that support for native support for Windows not having to go through WSL is coming soon. So maybe by the time you see this it already supports Windows out of the box.
- There's a command you need to run to set up something called the the the Cloud app in the GitHub repo. And when you do that, it's going to complain if you don't have a few things already installed on your machine. The way you do that is that you slash and then I start typing install.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And these are new workflows added to our GitHub repo coming from Cloud. And that means the setup is complete. The bottom line is that all of this is about within Claude Code, running that slash command, install GitHub app and then just following the instructions, dealing with pasting tokens from one place to another, following all of the commands and making sure that everything is followed. You can see it's telling you right here the steps that you need to do in order to complete this and then any key to exit and finally we're done with setup it's time to put this to work.
`;export{e as default};