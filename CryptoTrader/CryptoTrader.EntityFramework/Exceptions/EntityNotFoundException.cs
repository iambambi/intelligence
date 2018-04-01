using CryptoTrader.EntityDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace CryptoTrader.EntityFramework.Exceptions
{
    public class EntityNotFoundException<T> : ApplicationException where T : class, IEntity
    {
        /// <summary>
        /// The affected identifiers
        /// </summary>
        protected readonly List<object> _identifiers = new List<object>();

        public List<object> Identifiers => _identifiers;

        public override string Message
        {
            get
            {
                return _identifiers.Any() ? ToString() : base.Message;
            }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="EntityNotFoundException{T}"/> class.
        /// </summary>
        /// <param name="identifiers">The affected identifiers.</param>
        public EntityNotFoundException(params object[] identifiers) : base(String.Empty)
        {

        }

        public EntityNotFoundException(string message) : base(message)
        {
        }

        public EntityNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected EntityNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public override string ToString() => $"Entity with type [{typeof(T).Name}], identifier [{String.Join(", ", _identifiers)}] not found!";
    }
}