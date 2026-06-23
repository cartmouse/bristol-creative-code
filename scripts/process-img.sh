# Processes an image to be 4:3 resolution and scaled to be <= 1000 wide
# Requires ffmpeg to be installed on your system: https://ffmpeg.org/
# Args:
#   $1 - input file path
#   $2 - output file path
#   $3 - (optional) offset for the cropped image in the form x:y

if [ -n "$3" ]; then
  IFS=: read -r OFFSET_X OFFSET_Y <<<"$3"
else
  OFFSET_X=0
  OFFSET_Y=0
fi

# ffmpeg vars:
#   0 - the cropped width
#   1 - the cropped height
ffmpeg -i "$1" -vf "crop='st(0,min(iw,ih*16/9)):st(1,min(ih,iw*9/16)):(iw-ld(0))/2+$OFFSET_X:(ih-ld(1))/2+$OFFSET_Y',scale='min(1000,iw):-2'" "$2" -y
