# Table: ClientesPotEntradas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkClientesPotEntradas_Iden | smallint | NO |
| FkEntradaTipos | nvarchar | NO |
| FechaEntrada | datetime | NO |
| FkMarcas | smallint | NO |
| FkProcedencias | nvarchar | YES |
| FkProcedenciaDet | nvarchar | YES |
| FkSalidaTipos | nvarchar | YES |
| FechaSalida | datetime | YES |
| FkEmpleados | smallint | NO |
| FkTerceros_Agente | int | YES |
| FechaPrevistaCambio | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| OfertaVN | bit | NO |
| FkEmpresas_Salida | smallint | YES |
| FkCentros_Salida | smallint | YES |
| FkMarcas_Salida | smallint | YES |
| FechaMod | datetime | NO |
| FkSecciones | int | YES |
| FkIntencionesCompra | nvarchar | YES |
| FkMarcas_Procedencia | smallint | YES |
