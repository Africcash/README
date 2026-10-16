
interface AvatarCompProps {
    src: string;
    alt: string;
    size: 'small' | 'medium' | 'large';
    rounded?: 'none' | 'small' | 'medium' | 'large' ;
    border?: 'none' | 'small' | 'medium' | 'large';
}

export const AvatarComp = ({ src, alt, size, rounded, border }: AvatarCompProps) => {
    return (
        <div className={`overflow-hidden ${rounded === 'none' ? 'rounded-none' : rounded === 'small' ? 'rounded-sm' : rounded === 'medium' ? 'rounded-md' : rounded === 'large' ? 'rounded-lg' : 'rounded-full'} ${border === 'none' ? '' : border === 'small' ? 'border border-[1px]' : border === 'medium' ? 'border border-2' : border === 'large' ? 'border border-4' : ''} ${size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-16 h-16' : 'w-24 h-24'}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
};