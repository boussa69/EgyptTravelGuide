import { useState, useRef } from "react";
import { Check, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InlineEditorProps {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
}

export default function InlineEditor({ 
  value, 
  onSave, 
  multiline = false, 
  placeholder = "Click to edit",
  className = ""
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(value);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`flex-1 ${className}`}
            rows={3}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`flex-1 ${className}`}
          />
        )}
        <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Check className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`group cursor-pointer rounded px-2 py-1 hover:bg-gray-50 flex items-center justify-between ${className}`}
      onClick={handleEdit}
    >
      <span className={value ? "text-gray-900" : "text-gray-400"}>
        {value || placeholder}
      </span>
      <Edit className="h-3 w-3 opacity-0 group-hover:opacity-50 ml-2" />
    </div>
  );
}