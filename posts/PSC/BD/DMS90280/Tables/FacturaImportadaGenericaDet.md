# Table: FacturaImportadaGenericaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkFacturaImportadaGenerica | bigint | NO |
| PkFacturaImportadaGenericaDet_Iden | smallint | NO |
| BaseImponible | bit | YES |
| BaseExenta | bit | YES |
| BaseNoSujeta | bit | YES |
| ImporteBase | decimal | YES |
| Impuesto | bit | YES |
| PorcentajeIVA | decimal | YES |
| IRPF | bit | YES |
| PorcentajeIRPF | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEntidades | nvarchar | YES |
| ConceptoAsiento | nvarchar | YES |
| PlantillasCodExternoDet | nvarchar | YES |
| CodServicioExterno | nvarchar | YES |
| Estado | nvarchar | YES |
| Coste | bit | YES |
| FkImpuestos | nvarchar | YES |
| ImpuestosEquivalencias | nvarchar | YES |
| FkCentros | smallint | YES |
| Referencia | nvarchar | YES |
| ProductCode | nvarchar | YES |
| ProductDescription | nvarchar | YES |
| Total | bit | YES |
| DebeHaber | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| IdOperacionTipos | tinyint | YES |
