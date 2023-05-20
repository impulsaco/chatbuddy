import { supabase } from "@app/lib/supabase";

// Deletion function
const deleteSentence = async (id) => {
    await supabase
      .from('sentences')
      .delete()
      .eq('id', id);

    return (
        id
    )
}

export default deleteSentence;