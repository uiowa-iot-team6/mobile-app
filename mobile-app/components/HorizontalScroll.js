import React, { useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import BoxComponent from './BoxComponent'; // Assuming BoxComponent is defined elsewhere

const HorizontalScroll = () => {
    const { width, height } = Dimensions.get('window');
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const componentWidth = width * 0.4;

        // Calculate the index of the currently visible component
        const currentIndex = Math.floor(offsetX / componentWidth);

        // Calculate the scroll position relative to the current component
        const relativeOffsetX = offsetX - currentIndex * componentWidth;
        const halfwayPoint = componentWidth / 2;

        // Check if the scroll position is halfway through the current component
        if (relativeOffsetX >= halfwayPoint) {
            // Scroll to the next component
            scrollViewRef.current.scrollTo({
                x: (currentIndex + 1) * componentWidth,
                animated: true,
            });
        }
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            onScroll={handleScroll}
            scrollEventThrottle={16} // Adjust this value as needed for performance
        >
                <BoxComponent width={width * 0.6} height={height * 0.4} />
                <BoxComponent width={width * 0.6} height={height * 0.4} />
                <BoxComponent width={width * 0.6} height={height * 0.4} />
                {/* Add more BoxComponent elements as needed */}
        </ScrollView>
    );
};

export default HorizontalScroll;
