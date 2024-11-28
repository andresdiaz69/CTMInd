# Table: Talones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkTalones_Iden | int | NO |
| FkEmpleados | smallint | NO |
| FechaAlta | datetime | NO |
| FkTerceros | int | YES |
| FkPagoFormas | nvarchar | NO |
| FkCtaBancarias | smallint | NO |
| FkMonedas | smallint | YES |
| NumTalon | nvarchar | NO |
| FkEmpleados_Beneficiario | smallint | YES |
| FkEmpleados_Entrega | smallint | YES |
| Receptor | nvarchar | YES |
| FechaEntrega | datetime | YES |
| ConceptoAsiento | nvarchar | NO |
| ReferenciaInterna | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FactorCambioMoneda | decimal | YES |
| FechaBaja | datetime | YES |
| Automatico | bit | NO |
| FkCentros | smallint | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
