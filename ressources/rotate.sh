find "$1" -wholename "*.png" | while read file; do
  convert "$file" -rotate 90 "$file"
done
