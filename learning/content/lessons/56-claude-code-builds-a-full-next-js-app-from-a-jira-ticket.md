# Claude Code Builds a Full Next.js App from a Jira Ticket

> Week 2 · Day 4

## Overview

And welcome back to Atlassian Jira, where I am pleased to see that issue PL2 has been moved to the Done column and has been ruled out as done. Amazing.

And obviously I didn't do that. Okay, let's also, let's get rid of this card because we don't need this one anymore.

That was only our delete to get rid of that simple website one. Off it goes.

## You will learn

- Understand the main ideas covered in **Claude Code Builds a Full Next.js App from a Jira Ticket**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Let's create a new website one off it goes, let's create a new card here. And this is going to be prototype of NDA creator, of mutual NDA creator. And that's what it's gonna be called.

Let's create that, let's come into it, look at the details, we are going to now approach this as if it's a real business requirement, something we want to do, maybe this has been entered in by a product team or by a business sponsor, not by a tech person. And that's something that we're just going to unleash on Cloud Code using proper feature development. Okay, so here is the description of the task.

It is a web application to create a mutual NDA document for a user. The user enters some key information in a form. The website then displays the mutual NDA enters some key information and a form.

The website then displays the mutual NDA with the key information filled in. The user can download the completed document locally. I'm intentionally being a bit loose about it.

As you might hear from a customer, I'm not saying what format it gets downloaded. I'm going to leave all this kind of detail up to cloud code. This is the Jira issued called prototype of mutual NDA creator.

I'm going to save that. It's presumably going to be PL3. It certainly is.

Back we go. Here is PL3. It is time for us to unleash the might of Claude Code.

Now, I started Claude again. I stopped it and started it, so it's nice and clean and fresh. Reduce/context.

We'll see that it's nice and clean. I am just going to go and re-authenticate one more time with that lesson. You end up having to just do this a lot with every new big task like this.

Just come in and approve and come down and accept. And then we know we're in great shape from that point of view. Okay.

And now I'm going to go back into Cloud Code. If you remember, we have this plugin feature dev, colon feature dev, and we're not going to need to say use feature dev or something, with this we can actually evoke the plugin directly using this syntax right here, and that's what we're going to do right now. And so check this out, I'm going to say feature dev, colon feature dev, please implement JRA issue PL3 with a next JS application in a directory called frontend then raise a PR when done.

That's it. That's bringing everything together. We are using an MCP server for the JIRA issue.

We're using a plug-in to guide the entire process using the seven step process. And we're using an Mcp server, then to raise a PR at the end of it. Jira to the dev process to GitHub, and let's see what Cloud makes of it.

We'll let it go. We are unleashing unleashing the fury of Cloud Code on this big challenge. So it's off, it's doing its thing.

I'm going to let it work on this. I will see you in a few minutes when hopefully we are running. Absolutely amazing.

So, Claude is following its command. It looked at the jira description, it understood what it had to do, it looked through the repo, and now it's stopped to come back to me with clarifying questions, which is how this particular workflow works. Here they are.

### Deep dive

First question, what download format should the completed NDA be available in? Remember, this was something I was kind of fuzzy on intentionally in the geo issue. It recommends PDF.

That sounds great to me. And to select, you can see it in the view there that it's got this question for me. I'm pressing this.

Should the app have a single step wizard or a single page form, a single page recommended? Let's go with that. How should the NDA be preview be displayed below the form side by side?

I think I prefer side by side. I'm going with side by side. Should this be a simple prototype or include styling polish?

I'm going to say styling polish. It would normally be functional prototype but I wanted to do better than that. Polish design, let's go with that.

Okay, review your answers. That all sounds good. We're going to do submit answers.

Off it goes. That was part of the clarifying step in this seven stage process. And it's on.

And now we will let it do its thing. I'm going to, it's going to try and create next app. And I'm going to go ahead with that.

Just checking yes, it is indeed doing it in front end. So it gets my approval and I will see you back here in another minute of me being very excited. Well it's pretty amazing.

It did everything. It went through, created everything, set it up. It's made tons and tons of files in front end.

I saw it doing everything and then created a PR. It used the GitHub tools then push it. Everything happened end to end.

If I'm going to criticize, ah, it might be that I don't see that it did any testing, which does seem like, it's not particularly a thorough process. Maybe I should have mentioned that in my request. I'm not sure.

I haven't seen any testing, but we should just give it a try as it is and see what happens. And then we might need to tell it to go and test and fix things. Let's see.

Okay, here we go. We'll get a new terminal. We will come in and do a CD front end and we'll do an MPM run dev.

And it comes up. Okay. And now we will launch this and see, okay.

Okay. We have ourselves a mutual NDA creator with two screens and we download PDF with lots of stuff. There's plenty of things here for me to fill in which makes total sense.

### Putting it together

Let me go through and do that right now. Okay, and I just filled all of that in and it's kind of cool that as I type it out, like if I look at this governing law in New York, you see it says governing law in New York down there. If I delete that, you'll see that it's changing dynamically as I do it, which is, you know, perfectly standard for these kinds of apps, but it's really nice that it's just done it well like that first time.

Okay, so I have now filled this in over here on the right. You can see the preview. It's not like I have to press to generate button or anything.

It's just live updated and it looks like it is a good and look that's put this put this on here too. That's really nice. It looks like it is a really good version of it and now we want to press the download PDF button and see if it works.

Here we go, press download PDF. It says, "Generating PDF." This company is called Banana's Inc, is what I call the company. With Bango's Inc, is the people that are signing.

My company is Banana's Inc, that company is Bango's. Let's take a look to see how the PDF looks. Here we go, click there, up it comes.

Close that. And it looks, look at that, it looks look at that it looks absolutely perfect that's a nice cover sheet and this is the the right kind of structure and let's just check that it's filled things in let's find something here. This is everything that's changed just on the cover sheet the cover sheet of course that's absolutely perfect.

And yeah, I it looks to me like it's got everything perfectly right. And it's got the common CC by 4.0 thing at the end of it. It seems to be absolutely excellent.

This is a PDF that's been downloaded based on the markdown templates, based on our next JS app. I don't think it tested it. Maybe it did and I didn't see that because I do think one of the steps was a quality review.

So at the very least it did a quality review and maybe it tested it too, but it certainly seems to have worked great first time. And I can't tell you how remarkable it is that we could have something like this appear zero sharp just with an instruction, with a jira ticket, a jira ticket for building this, a jira ticket to populate the data, which was impressive enough. And now a juriticket to build all of this, we used anthropics seven step process that means that it asked us the questions and it clarified and it went through a rigorous process.

And this is the result and it is super impressive. And we can of course, we can ask Claude itself. Let's first, we'll just take a look at the context, always worth looking at the context to see what state we're in.

Scroll up and have a look. Okay, it's filled up about a third, almost a half of the context. We can say it's working great.

Based on the process, you followed. What kind of quality review or testing have you already taken care of? Let's see if it can be introspective and tell us about its process.

When it farms things off to sub-agents, which we'll do more of next week, one of the things that the good part is that it keeps it out of context. Out of the context window, all of that happens. A bad part is of the context window, all of that happens.

A bad part is the overall agent, the thing that we talked to, has less of an understanding of everything that happened. Good question, who was actually happening? Build verification, so it confirmed that.

No automated testing, no manual testing, no code reviewer agents, phase six from the feature dev workflow was skipped, so it is able to at least recognize. I thought I didn't see it doing anything like that. No PDF download testing.

The bill passing gives some, but it doesn't validate.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Let's create a new website one off it goes, let's create a new card here. And this is going to be prototype of NDA creator, of mutual NDA creator. And that's what it's gonna be called.

## Practical tips

- And now I'm going to go back into Cloud Code. If you remember, we have this plugin feature dev, colon feature dev, and we're not going to need to say use feature dev or something, with this we can actually evoke the plugin directly using this syntax right here, and that's what we're going to do right now. And so check this out, I'm going to say feature dev, colon feature dev, please implement JRA issue PL3 with a next JS application in a directory called frontend then raise a PR when done.
- First question, what download format should the completed NDA be available in? Remember, this was something I was kind of fuzzy on intentionally in the geo issue. It recommends PDF.
- If I'm going to criticize, ah, it might be that I don't see that it did any testing, which does seem like, it's not particularly a thorough process. Maybe I should have mentioned that in my request. I'm not sure.
- This is a PDF that's been downloaded based on the markdown templates, based on our next JS app. I don't think it tested it. Maybe it did and I didn't see that because I do think one of the steps was a quality review.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Would you like me too? So, you know, we know that it works because we've done that, but we might as well say, let's say yes to all three. Please add extensive tests, Please add extensive tests, automated tests, and manual tests, and have the code reviewer agents do the review. It's interesting that only because we asked that question, did we find that it skipped step six, and it just shows you that it's not always super reliable with this stuff we will oh I've already got mpm run dev running I wonder if that's going to cause a problem maybe I should just stop this like that I could have completely confused it now we'll we'll find out what happens so I mean I let it do its thing let it do its code review and everything and I will see you in a minute!
