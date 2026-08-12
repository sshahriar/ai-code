# Connecting Claude Code to Jira MCP Server & GitHub Repository

> Week 2 · Day 4

## Overview

Okay, this next part is cool. So just to recap, we went into Atlassian, we created a new account, if you didn't have one already, and then we navigated our way to Spaces, we created a new space called Prelegal and created a new task work item that used to be called an issue, which says something about Create A Company website.

That is where we are. I've now come back into VS Code.

I am looking at the PM project project just because I wanted to open any old project, go to PM for convenience. We're not going to be actually using the project management project anymore.

## You will learn

- Understand the main ideas covered in **Connecting Claude Code to Jira MCP Server & GitHub Repository**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

But here we are and we're about to add an mcp server to our cloud code. So I'm going to paste in here a command, Claude mcp add. And I'm going to say, you'd say, adding an MCP server, we're using the HTTP, we're using a remote MCP server from Atlassian, the makers of Jura, to bring in mcp.

Atlassian.com/v1/mcp. This is their MCP server, let's give it a shot. It has added it in.

We now have this MCP server. Now we're going to start Cloud Code with Claude. Up it comes.

Okay, so first up, I'm going to do slash mcp to check out our situation with mcp servers. It tells us that we've got Atlassian as an installed mcp server, Atlassian, the makers of Jira, the issue tracking system, and but it needs authentication, it's saying. And that's cool because nowhere did we give it a key or anything about JIRA how could it know what to use and we're now going to use this feature of mcp which is about authentication which allows you to log into something like JIRA and authorize the Atlassian mcp for your JIRA account and that is really cool that's what we're going to do now and so look I'm going to go to to the I'm going to press the down and up button to select that one, I'm going to press enter.

So that we're going into it. It says need authentication, not authenticated. Do you want to authenticate?

Basically, it's authenticate or disable, we're going to say authenticate. And look at that, bam, up comes a window. Atlassian, do you want to authenticate now if if I want to already logged in, it would have the Atlassian login screen, I press approve and it says, Atlassian is requesting access to your account, except this is the famous OAuth 2 flow.

If you know it, if you take it in my end of course you know that flow only too well. It's hard to build that flow, but it works. Close this window and return to Cloud Code, let's do that.

Now one thing I'll tell you and people complain about this all over the place is that sometimes that authentication seems to get lost, forgotten and you have to re-authenticate and the way you know you have to is because Cloud Code hangs trying to use the tools. They just sit there and so when you see that happening that's a sign you might need to come in do slash mcp again and then there's a re-authenticate option for it. I'll show you this.

Alastin it says it's connected now, there is a re-authenticate if we would need to do this, but we don't need to do that, but if we did, that's what we would do. But now, if we just do slash context, let's look at what tools we've got access to, if I scroll up here, sorry, we're not doing scrolling up, here we go, you can see there's tons of MCP Atlassian tools, that's what we've got access to, we can use them. Let's try.

Please tell me about Jira issue PL-1. Remember that? That was the one that we just did.

That was like make me a company website blah blah blah. So we're going to let it do its thing. It's asking if it can use a tool and I'll press number two.

I'll say go for it. You can use that tool as much as you want. It's probably gonna ask me about more tools.

Yes, do it. Off it goes. And there we go.

Here it comes, PL1. We need a simple website that describes the pre-legal company. It worked.

### Deep dive

Wow, I'm almost surprised by myself. So if it just hung for you, remember you might need to re-authenticate. Otherwise, if you get stuck with this whole JIRA thing, remember that you can also use GitHub issues, which are somewhat easier.

But this is such a sort of cool part of the way many teams work, that I thought hooking us up to JIRA through the JIRA MCP server, was a really nice thing to do. Okay, and for my next trick, I've shown you how we can hook up to JIRA. We're now going to hook up to GitHub and have GitHub be part of our skill set that CloudCobel have access to.

Let's go over to GitHub. Okay, so I'm signed into my GitHub now just gone to github.com and this is my my home screen and now I'm going to press the new button to create a new repository. Okay, and I'm going to call my repo.

And the reason I don't want to have you pull my own is that we're going to do everything from the beginning with this. You're going to build your whole project and workflow with cloud code. So we're going to call this repository pre legal, which hopefully will still be available.

We'll make the description be a platform for for drafting common legal agreements. That seems good. I'm going to keep it private and you may have it.

I'll keep it private until it's ready and then maybe make it public and so that you could clone it if you wish to. And we won't have a template and we won't have a readme or a git ignore. We maybe we'll just have a license, we'll give it the MIT license, which is always a good license to have, but if you want to commercialize this, you can build something with a different license, and we will use this, oh, we might as well add a generic readme, just to have something in there.

We'll use that and we'll press Create Repository and let pre-legal get created. There it is, a platform for drafting common legal agreements. Okay, nice.

Okay, next up we need to find a settings menu but not the settings menu here, that's the repo settings but rather go to your avatar menu, go down to settings to bring up your GitHub settings, and then you have to scroll all the way down on the left to developer settings. Maybe there's an easy way to find this, I don't know, but this is the way I know. And then to personal access tokens, and then to fine-grained tokens.

It's not like this is easy to find. And when you've done that, you're gonna press the generate new token button. So next up, you'll have to enter in your password, perhaps.

You may have to do a two-factor authentication to make absolutely sure you have the authority to do this. And then you're creating this new fine-grainer access token. We're gonna be giving Cloud Code access to our repo this way.

So we have to be careful to make sure we give it good permissions and not too much. So I'm giving it a name. I'm calling it for mcp server.

It's just for reference. So we know that that's what we're going to call it. It's going to expire in 30 days.

It's good to have that kind of thing on it. You can have it have no expiration if you wish. I've selected only select repositories.

I've gone to select repositories and I've ticked this repository so that it only has access to this repo called prelegal. And that seems like that gives us complete control of this because we're only going to use this repo for Cloud Code anyway. So this is a good way to fix the permissions of this key on one repo.

### Putting it together

And now we get to add the actual permissions that it can, the things it can actually do. And here it's worth starting small and only expanding when you need to. So what we're going to do here is we're gonna say, okay, well, it is going to need to be able to see the contents of this repo.

That seems perfectly reasonable. It's going to be able to look at issues, although we're using Atlassian Jira for issues. You might want to use GitHub.

So it'll be able to use GitHub issues. PRs, it's gonna have PR access. And I think that's it.

Now, it's possible we'll turn out, we'll need more permissions, in which case we come back and open it up. But it's a good practice to start with slim permissions and open up as you need to. Now, the access here, we've got read-only access to the contents, read-only to the issues.

We might want to allow it to write issues if we wish. Pull requests will let have read and write access to that as well. And with that we press the generate token button and it prompts us to tell us a little summary of what being allowed to do and then we'll press the generate token button.

And of course on the next screen it showed you the token and you must have copied it to your clipboard, put it somewhere safe. Don't put it in a word processor program like Microsoft Word that's going to replace quotes with curly quotes and do stuff to it, put it somewhere safe where it's not gonna get mangled with or keep that window up to one side so you can continue to copy it until we're gonna use it once to set up Cloud Code in a moment. But first, I want you to go back to your GitHub home where we are going to then clone this repo and then we're ready for action.

Okay, so now I go here, I go to home and we're going to find pre-legal. It's probably under show more, some lots of repos. All right, there you are, pre-legal.

Here it is. And now we go to code and you can choose HTTPS or SSH depending on your setup for GitHub. Probably best to do HTTPS.

Copy that to clipboard. This particular thing here and now now we're going to go back to VS code. So here we are in the welcome screen.

You can be in anyone. You could still be in PM if you want. Bring up a terminal.

I don't need to tell you it's control back tick. And I'm in my home directory as we'll'll see, if I do PWD, there I am. I'll do CD projects to go into my project's directory.

And now I'm going to type git clone. And I'm going to paste in that directory here. And damn, we have ourselves a legal repo, CD, legal, LS.

Oh, sorry, CD prelegal even. CD prelegal.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

But here we are and we're about to add an mcp server to our cloud code. So I'm going to paste in here a command, Claude mcp add. And I'm going to say, you'd say, adding an MCP server, we're using the HTTP, we're using a remote MCP server from Atlassian, the makers of Jura, to bring in mcp.

## Practical tips

- Alastin it says it's connected now, there is a re-authenticate if we would need to do this, but we don't need to do that, but if we did, that's what we would do. But now, if we just do slash context, let's look at what tools we've got access to, if I scroll up here, sorry, we're not doing scrolling up, here we go, you can see there's tons of MCP Atlassian tools, that's what we've got access to, we can use them. Let's try.
- Please tell me about Jira issue PL-1. Remember that? That was the one that we just did.
- Wow, I'm almost surprised by myself. So if it just hung for you, remember you might need to re-authenticate. Otherwise, if you get stuck with this whole JIRA thing, remember that you can also use GitHub issues, which are somewhat easier.
- And the reason I don't want to have you pull my own is that we're going to do everything from the beginning with this. You're going to build your whole project and workflow with cloud code. So we're going to call this repository pre legal, which hopefully will still be available.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

We have a prelegal directory, LS. And there we go. We see a license and a read me, that's what we were expecting in pre-legal. Excellent.
