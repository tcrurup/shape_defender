class User < ApplicationRecord

    before_save :create_presets

    has_secure_password
    has_many :presets

    validates :username, uniqueness: { message: "is already in use"}

    def createOrUpdatePreset(preset_number, preset_params)
        p_index = preset_number - 1
        preset = self.presets[p_index]
        if preset.is_a? Preset
            preset.update(preset_params)
        else
            self.presets[p_index] = Preset.create(preset_params)
        end 
    end

    

    private

    def create_presets
        while self.presets.length < 3
            self.presets << Preset.create()
        end
    end

    


    
end