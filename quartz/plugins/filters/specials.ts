import { QuartzFilterPlugin } from "../types"

export const RemoveSpecials: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveSpecials",
  shouldPublish(_ctx, [_tree, vfile]) {
    const draftFlag: boolean = vfile.data?.frontmatter?.draft ?? false
    const privateFlag: boolean = vfile.data?.frontmatter?.private ?? false
    return !privateFlag && !draftFlag
  },
})
