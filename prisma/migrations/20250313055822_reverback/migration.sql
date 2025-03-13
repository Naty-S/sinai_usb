-- DropForeignKey
ALTER TABLE "s1_novel_jurado_usb" DROP CONSTRAINT "s1_novel_jurado_usb_s1_novel_fkey";

-- AddForeignKey
ALTER TABLE "s1_novel_jurado_usb" ADD CONSTRAINT "s1_novel_jurado_usb_s1_novel_fkey" FOREIGN KEY ("s1_novel") REFERENCES "s1_novel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
