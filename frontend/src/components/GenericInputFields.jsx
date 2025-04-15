import { Accordion, AccordionItem, TextInput } from "carbon-components-react";
import { useEffect, useState } from "react";

const GenericInputFields = ({ data, schema, setHoveredKey }) => {
  const extractionData = data?.extraction_json || {};
  const [formData, setFormData] = useState(extractionData);

  useEffect(() => {
    setFormData(extractionData);
  }, [extractionData]);

  const handleMouseEnter = (key, pageNum) => {
    if (key && pageNum != null) {
      setHoveredKey({ key, pageNum });
    }
  };

  const handleMouseLeave = () => {
    setHoveredKey({ key: null, pageNum: null });
  };

  const handleInputChange = (field, value) => {
    const oldValue = formData[field];
    const newValue =
      typeof oldValue === "object" && oldValue !== null && "value" in oldValue
        ? { ...oldValue, value }
        : value;

    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const sectionData = [...(formData[schema.sectionKey] || [])];
    if (!sectionData[index]) sectionData[index] = {};
    sectionData[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      [schema.sectionKey]: sectionData,
    }));
  };

  const flatFields = schema.flatFields || [];
  const sectionData = formData[schema.sectionKey] || [];

  return (
    <div
      style={{
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {flatFields.map((field) => (
        <div
          key={field}
          id={`json-${field}`}
          onMouseEnter={() => {
            let coordinatesData =
              data.extraction_json_with_coordinates || data.extraction_json;
            const coords =
              data.extraction_json_with_coordinates?.[field]?.coordinates ||
              data.extraction_json?.[field]?.coordinates;
            if (coords == null) return;
            handleMouseEnter(field, coordinatesData?.[field]?.page_num);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <TextInput
            id={field.toLowerCase().replace(/\s+/g, "-")}
            type="text"
            labelText={field}
            value={
              typeof formData[field] === "object"
                ? formData[field]?.value || ""
                : formData[field] || ""
            }
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      ))}

      <Accordion>
        {sectionData.map((entry, index) => (
          <AccordionItem
            key={`${schema.sectionKey}-${index}`}
            title={`${schema.sectionTitle} ${index + 1}`}
          >
            {schema.sectionFields.map((field) => (
              <div
                key={`${field}-${index}`}
                id={`json-${field}-${index}`}
                onMouseEnter={() => {
                  debugger;
                  let coordinatesData =
                    data.extraction_json_with_coordinates ||
                    data.extraction_json;
                  const coords =
                    coordinatesData?.[schema.sectionKey]?.[index]?.[field]
                      ?.coordinates ||
                    coordinatesData?.[schema.sectionKey]?.[index]?.coordinates;
                  if (coords == null) return;
                  handleMouseEnter(
                    `${field}-${index}`,
                    coordinatesData?.[schema.sectionKey]?.[index]?.[field]
                      ?.page_num ||
                      coordinatesData?.[schema.sectionKey]?.[index]?.page_num
                  );
                }}
                onMouseLeave={handleMouseLeave}
              >
                <TextInput
                  id={`${field.toLowerCase()}-${index}`}
                  type="text"
                  labelText={field.replace(/([A-Z])/g, " $1").trim()}
                  value={entry[field] || ""}
                  onChange={(e) =>
                    handleSectionChange(index, field, e.target.value)
                  }
                />
              </div>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default GenericInputFields;
