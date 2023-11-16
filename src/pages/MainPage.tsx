import {Card} from "antd";
import {GithubOutlined} from "@ant-design/icons";


export function MainPage() {
    return (
        <Card className="w-full h-full"
              bodyStyle={{height:'70%'}}
              title='Main Page'
        >
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                <span className="block text-3xl">This is the Main Page!</span>
                <div className="flex gap-5 items-center">
                    <GithubOutlined className="text-3xl" />
                    <span className="text-xl">github.com/alexMercy</span>
                </div>

            </div>
        </Card>
    );
}