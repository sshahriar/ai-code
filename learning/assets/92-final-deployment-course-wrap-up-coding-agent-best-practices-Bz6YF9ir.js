var e=`# Final Deployment, Course Wrap-Up & Coding Agent Best Practices

> Week 3 · Day 5

## Overview

But wait, there's more. There's one more thing.

I just had a 15 minute conversation. I kid you not with Kodak's.

We talked about the best place to deploy this on the internet, and we agreed that using FlyIO, the company behind Sprite's that there would be a great choice for deploying a container as is. It wrote a script for me.

## You will learn

- Understand the main ideas covered in **Final Deployment, Course Wrap-Up & Coding Agent Best Practices**
- Follow the practical walkthrough from Week 3, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We ran the script. We've deployed. And you're looking here, if you just look at the URL up there, you are looking at finally-ed.fly.dev.

This is deployed live on the internet. The AI chat works. The portfolio is there.

The market data is live. We set up the environment variables correctly. Everything is running.

This is now deployed and deployment took all of 15 minutes and you should do it too. So here finally, I leave you finally with the project finally deployed on the internet with live market data and a nice light look to boot. And so take our last look at the different orchestrators that we've used.

I would say that my favorite experience is with Claude Agent Teams and the winner of the prize in this case was probably Kodak's. He did a fine job there and of course I used it through Sprite Dev which is such a powerful way to use these agents because you can use a coding agent in Yolo mode and feel completely secure which is great. So the big challenge for you now is to take the repo as it stands and give one of these things a try.

If you're using a free model, maybe you're using open code with a free model or an open source cheap model, then you will have, you may have a more challenging experience, maybe using something as disciplined as GSD is your way of getting there. If you are splashing out and using something like little code, then you should have an easy old time with it. But see if you can't challenge it to do something a bit different.

Maybe you want to add in a kind of the users table so different people can log in as we had it in week two in the SAS legal platform, adding that functionality as well. So take it in your direction. Remember, the amazing thing about these coding agents is that it's a choose your own adventure story.

You've got a really robust specification there in the form of the claw.md and now you can build something and take it somewhere new, give yourself your own trader workstation and enjoy it. And see whether you get similar outcomes to me and whether you find that the clawed or codex or some other model is the winner. And let me know.

Share your results. Please, on Udemy, tell me what you discover. Or of course, share it on LinkedIn.

That's a great place to share it. Put it on LinkedIn, show what you've got and I will weigh in, I will add some comments if you tag me and I will make sure that I amplify your success. And again, if you see other students doing this, then please jump in yourself and add some comments to theirs as well that really helps amplify the whole community if we're there to support each other.

### Deep dive

Okay it's time for a wrap-up. It's time for us to go to the final segment. Stay for the final segment because it's always good to wrap things up but unfortunately this is the tearful moment when we finish things off and what better place to finish things off than going back again to the Andre Carpathi tweet that started this whole course.

And I'm going to read it to you one more time. But this time, this time, it's like I'm speaking to in a foreign language at the beginning and then again, once you've learned all of the vocabulary, hopefully it all will fall into place. Andrei says, "I've never felt this much behind as a programmer.

Profession is being refactored as the bits contributed by a programmer are becoming sparse. I could be 10 times more powerful if I could just string together everything that's become available. There's a new layer of abstraction to master with agents, sub-agents, their prompts, context memory, modes, permissions, tools, plugins, skills, hooks, mcp, lsp slash commands, workflows, IDEs, and the need to build an all-encompassing mental model for the strengths and pitfalls of fundamentally stochastic, fallible, unintelligible, and changing entities.

Clearly, a powerful alien tool was handed around, except it comes with no manual, and everyone has to figure out how to operate it, while the resulting magnitude nine earthquake is rocking the profession. The role up your sleeves to not fall behind. So obviously the bad news is that it's not like a given you total transparency and clarity because this world is moving so fast.

And when we look at things like gas town, it still feels completely bewildered for me, let alone for you. So yes, it is a bit crazy out there, but I do hope, at least now, that you've dimensioned the landscape, you've got a good sense of like things like plugins and skills and when to use each and you've got that hands-on experience working, first of all, in the IDE's, but then of course, in the CLIs with Cloud Code or Kodak's. And now you know about things, things that Andre didn't even mention, like Sandbox in, that's so important and powerful, and how you can use that with YOLO mode.

you know about Ralph Loops and now you also know about GSD, you know about all these different bits and pieces and you've experimented with them and that's perhaps the most important thing that I have to say to you. The single most important thing is you need to be willing to experiment. There's not necessarily one right answer.

The great thing about using these coding agents is you can kick it off, let it it build something if it all goes wrong just simply start again try it again with a different approach As you think about the approaches keep this chart in mind I know I've gone this through this like honor times But typically for more mission critical stuff large code bases for code that is at the forefront So it may not be in much of the coding agents training data Keep to the top row the yellow, look at managing with lots of markdown files, taking things very incrementally, and the top right SDD spec driven design. That's things like GSD, it's worlds where you work step by step through a clear workflow, that kind of approach, and the trust but verify mindset. And if you're doing MVPs, new build, you've got some risk appetite, you're churning out boilerplate code, go for the purples, YOLO, but in a sandbox, in something like sprite.dev or it like a managed clawed on the web, YOLO, use Ralph Loops perhaps, and then the whole idea of multi-agent swarms and orchestration that we've been doing the last couple of days.

And to give you some of the big takeaways, you should pick the right coding agent and the workflow to use based on how mature the project is and what sort of risk appetites you have. Your personal skills, what's going to suit if you're a seasoned pro, then you're probably leaning towards the CLI tools. If you're still getting used to this, and maybe the IDEs are going to feel more comfortable for you, and just your preference.

Like the mode of work that you enjoy. Some people just love working in CLIs and some people just prefer having the interactivity of an IDE. And you also potentially get, get familiar with some of the models.

You might just like Claude. It might just work for you. It works for me.

### Putting it together

And then follow these steps. First thing to look at is the plugins. Plugins is easy to look at the official plugins and pick the most popular ones or the ones that are the most popular ones that will work for your project like Feature Dev or the one that simplifies code or builds professional front ends.

Pick the plugins that are going to work for you. And then next up, typically, skills. It's the next thing to do.

Picking skills are going to really work nicely for your project. And this is also an opportunity to use an MCP server if there are MCP servers like context seven, which is exactly what you need. Although there's also the plugin for that too.

And then just be willing to do trial and error, just have that experiment as mindset, kick it off, see what happens, if it's not gonna work for you, you can just throw it away and go back. And having that mindset is just so critical. And obviously make heavy use of Git.

It is your friend. It gives you such an easy ability to go back to where you were and also be disciplined about markdown docs, get things to write to mark down, use that as it sort of baked into some of these workflows, use it as your way of tracking what's going on just as we've been doing both in weeks two and three. That is such a great process.

And on that note, also just generally manage your context in Cloud Code do slash context all the time. See what's going on. Don't wait for your context to compact, manage it yourself.

Write stuff out to Markdown, write stuff to cloud.nd or agents.md and then do a slash clear to start again and be fresh with your contacts. Being proactive about context management is just the right way to do it. And finally remember you own the quality of the code that you push.

Remember that AIPR policy from Jellyfin. Keep that in mind. This is code that you stand behind.

Don't let your coding agent build SLOP. Don't let it put tons of extra test files or read me's and please no emojis. Be ruthlessly on top of it.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We ran the script. We've deployed. And you're looking here, if you just look at the URL up there, you are looking at finally-ed.fly.dev.

## Practical tips

- Maybe you want to add in a kind of the users table so different people can log in as we had it in week two in the SAS legal platform, adding that functionality as well. So take it in your direction. Remember, the amazing thing about these coding agents is that it's a choose your own adventure story.
- That's a great place to share it. Put it on LinkedIn, show what you've got and I will weigh in, I will add some comments if you tag me and I will make sure that I amplify your success. And again, if you see other students doing this, then please jump in yourself and add some comments to theirs as well that really helps amplify the whole community if we're there to support each other.
- Okay it's time for a wrap-up. It's time for us to go to the final segment. Stay for the final segment because it's always good to wrap things up but unfortunately this is the tearful moment when we finish things off and what better place to finish things off than going back again to the Andre Carpathi tweet that started this whole course.
- And I'm going to read it to you one more time. But this time, this time, it's like I'm speaking to in a foreign language at the beginning and then again, once you've learned all of the vocabulary, hopefully it all will fall into place. Andrei says, "I've never felt this much behind as a programmer.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Make things sharp and good quality code. Own the code. Make sure that it is good quality. Okay, those are the major takeaways.
`;export{e as default};